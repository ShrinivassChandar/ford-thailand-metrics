import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFiles(category) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFiles = useCallback(async (retry = false) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('files')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setFiles(data || [])
    } catch (err) {
      if (!retry) {
        setTimeout(() => fetchFiles(true), 1000)
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchFiles()

    const channel = supabase
      .channel(`files-${category}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'files',
        filter: `category=eq.${category}`
      }, () => {
        fetchFiles()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [category, fetchFiles])

  const uploadFile = async (file, uploaderName) => {
    // Check file type
    const validTypes = ['.csv', '.xlsx', '.xls']
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!validTypes.includes(ext)) {
      throw new Error('TYPE_ERROR')
    }
    // Check file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      throw new Error('SIZE_ERROR')
    }

    // Check for duplicate name
    const existingNames = files.map(f => f.file_name)
    let finalName = file.name
    if (existingNames.includes(file.name)) {
      const nameParts = file.name.split('.')
      const ext2 = nameParts.pop()
      const baseName = nameParts.join('.')
      finalName = `${baseName}_2.${ext2}`
    }

    const storagePath = `${category}/${Date.now()}_${finalName}`
    const fileType = ext === '.csv' ? 'CSV' : 'XLSX'

    const { error: uploadError } = await supabase.storage
      .from('metrics-files')
      .upload(storagePath, file, { contentType: file.type })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('metrics-files')
      .getPublicUrl(storagePath)

    const { error: dbError } = await supabase.from('files').insert({
      category,
      file_name: finalName,
      uploader_name: uploaderName,
      file_size: file.size,
      file_type: fileType,
      file_url: urlData.publicUrl,
      storage_path: storagePath,
    })

    if (dbError) throw dbError

    await fetchFiles()

    return { wasDuplicate: existingNames.includes(file.name), finalName }
  }

  const deleteFile = async (fileId, storagePath) => {
    const { error: storageError } = await supabase.storage
      .from('metrics-files')
      .remove([storagePath])

    if (storageError) console.warn('Storage delete error:', storageError)

    const { error: dbError } = await supabase
      .from('files')
      .delete()
      .eq('id', fileId)

    if (dbError) throw dbError
    await fetchFiles()
  }

  return { files, loading, error, uploadFile, deleteFile, refetch: fetchFiles }
}
