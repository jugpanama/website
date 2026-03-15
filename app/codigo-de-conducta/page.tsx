import { redirect } from 'next/navigation'

const CODE_OF_CONDUCT_README_URL = 'https://github.com/jugpanama/website/blob/main/CODE_OF_CONDUCT.md'

export default function CodigoDeConductaPage() {
  redirect(CODE_OF_CONDUCT_README_URL)
}
