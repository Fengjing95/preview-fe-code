import { FileSystemTree } from '@webcontainer/api'

export interface RepositoryAdapter {
  fetchRepository(
    owner: string,
    repo: string,
    path?: string,
  ): Promise<{
    files: Array<{
      path: string
      content: string
      type: 'file' | 'directory'
    }>
    fileSystem: FileSystemTree
  }>

  /**
   * 获取仓库所有者的详细信息
   * @param owner - 仓库所有者用户名
   */
  getOwnerInfo(owner: string): Promise<{
    avatar: string // 头像URL
    htmlUrl: string // 个人主页URL
    name: string // 用户名
    bio: string // 个人简介
    company?: string // 所属公司（可选）
    location?: string // 所在地（可选）
    blog?: string // 博客地址（可选）
    followers: number // 关注者数量
    following: number // 关注数量
  }>

  /**
   * 获取仓库的统计信息
   * @param owner - 仓库所有者
   * @param repo - 仓库名称
   */
  getRepositoryStats(
    owner: string,
    repo: string,
  ): Promise<{
    stars: number // star数量
    forks: number // fork数量
    watchers: number // watch数量
    description: string // 仓库描述
    url: string // 仓库地址
  }>
}
