import { redirect } from 'next/navigation'

const CODE_OF_CONDUCT_README_URL = 'https://github.com/jugpanama/jugpanama/blob/main/README.md'

export default function CodigoDeConductaPage() {
  redirect(CODE_OF_CONDUCT_README_URL)
}
