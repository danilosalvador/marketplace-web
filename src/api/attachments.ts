import { api } from '@/lib/axios'

export interface AttachmentsBody {
  files: FormData
}

export interface AttachmentsResponse {
  attachments: [
    {
      id: string
      url: string
    },
  ]
}

export async function attachments({ files }: AttachmentsBody) {
  const { data } = await api.post<AttachmentsResponse>('/attachments', files)

  return data
}
