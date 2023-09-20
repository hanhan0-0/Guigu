import { RouteRecordRaw } from 'vue-router'

export interface UseState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
