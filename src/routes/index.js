import Following from '@/pages/Following'
import Home from '@/pages/Home'
import Upload from '@/pages/Upload'

export const publicRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/following',
    component: Following
  },
  {
    path: '/upload',
    component: Upload,
    layout: null
  }
]

export const privateRoutes = []
