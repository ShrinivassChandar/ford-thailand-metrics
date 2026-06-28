import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFiles(category) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await supabase
        .from('files')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
      setFiles(data || [])
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
        filter: `category=eq.${category}`,
      }, () => {
        fetchFiles()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [category, fetchFiles])

  const uploadFile = async (file, uploaderName) => {
    const validExts = ['.csv', '.xlsx', '.xls']
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!validExts.includes(ext)) throw new Error('TYPE_ERROR')
    if (file.size > 50 * 1024 * 1024) throw new Error('SIZE_ERROR')

    const existingNames = files.map(f => f.file_name)
    let finalName = file.name
    if (existingNames.includes(file.name)) {
      const parts = file.name.split('.')
      const fileExt = parts.pop()
      finalName = `${parts.join('.')}_2.${fileExt}`
    }

    const storagePath = `${category}/${Date.now()}_${finalName}`

    const { error: storageError } = await supabase.storage
      .from('metrics-files')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (storageError) {
      console.log('Storage upload error:', JSON.stringify(storageError))
      throw storageError
    }

    const { data: urlData } = supabase.storage
      .from('metrics-files')
      .getPublicUrl(storagePath)

    const fileExt = file.name.split('.').pop()

    const { error: dbError } = await supabase.from('files').insert({
      category,
      file_name: finalName,
      uploader_name: uploaderName,
      file_size: file.size,
      file_type: fileExt.toUpperCase(),
      file_url: urlData.publicUrl,
      storage_path: storagePath,
    })

    if (dbError) {
      console.log('DB insert error:', JSON.stringify(dbError))
      throw dbError
    }

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

  return { files, loading, uploadFile, deleteFile, refetch: fetchFiles }
}
