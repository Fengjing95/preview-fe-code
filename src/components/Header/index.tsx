import { baseInfoAtom, repoInfoAtom } from "@/store/repo"
import { useAtom, useAtomValue } from "jotai"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import classnames, { clsx } from 'clsx'
import {
  BiDockBottom,
  BiDockLeft,
  BiDesktop,
  BiSolidWindowAlt,
} from "react-icons/bi";
import { Toggle } from "@/components/ui/toggle"
import { leftPanelOpenAtom, bottomPanelOpenAtom } from "@/store/global";
import { useKeyPress } from "ahooks"
import { KEY_MAP } from "@/constants/keyboard"
import { ThemeToggle } from "../ThemeProvider/ThemeToggle"

enum ActionKey {
  LEFT_PANEL = 'leftPanel',
  BOTTOM_PANEL = 'bottomPanel',
  PREVIEW_PANEL = 'previewPanel',
}

export function Header() {
  const repoInfo = useAtomValue(repoInfoAtom)
  const { owner, repo } = useAtomValue(baseInfoAtom)
  const [leftPanelOpen, setLeftPanelOpen] = useAtom(leftPanelOpenAtom)
  const [bottomPanelOpen, setBottomPanelOpen] = useAtom(bottomPanelOpenAtom)

  useKeyPress(KEY_MAP.fileTree.key, () => {
    setLeftPanelOpen(!leftPanelOpen)
  })

  useKeyPress(KEY_MAP.terminal.key, () => {
    setBottomPanelOpen(!bottomPanelOpen)
  })

  return <div className="h-full flex items-center select-none px-4 border-b">
    {/* owner信息 */}
    <div className="flex-1 flex gap-2 items-center">
      <a
        className="cursor-pointer flex gap-2"
        href={repoInfo?.ownerInfo?.htmlUrl}
        target="_blank"
        title="前往主页"
      >
        {
          repoInfo?.ownerInfo?.name ?
            <Avatar className="w-6 h-6">
              <AvatarImage src={repoInfo.ownerInfo.avatar} alt={repoInfo.ownerInfo.name} />
              <AvatarFallback>{repoInfo.ownerInfo.name.slice(0, 2)}</AvatarFallback>
            </Avatar> :
            <Skeleton className="w-6 h-6 rounded-full border" />
        }

        {
          repoInfo?.ownerInfo?.name ?
            <span className="text-secondary-foreground">{repoInfo?.ownerInfo.name}</span> :
            <Skeleton className="w-24 h-6" />
        }
      </a>
      <BiSolidWindowAlt
        className="cursor-pointer"
        title="复制 iframe 嵌入代码"
        onClick={() => { }}
      />
    </div>

    {/* 仓库名称 */}
    <div className="flex-1 flex justify-center">
      <a
        href={repoInfo?.repoUrl}
        target="_blank"
        title="前往仓库"
        className={classnames(
          'block',
          'rounded-lg',
          'border',
          'cursor-pointer',
          'px-5',
          'text-center',
          'overflow-hidden',
          'text-ellipsis',
          'whitespace-nowrap',
          'min-w-0',
          'max-w-[300px]',
          'flex-1'
        )}
      >
        {owner}/{repo}
      </a>
    </div>

    {/* actions */}
    <div
      className="flex-1 flex justify-end gap-1"
    >
      <Toggle
        value={ActionKey.LEFT_PANEL}
        aria-label="左侧面板"
        title="左侧面板"
        size="sm"
        className={clsx(
          // '[&_svg]:size-6',
          // { 'bg-slate-600': leftPanelOpen }
        )}
        onClick={() => {
          setLeftPanelOpen(!leftPanelOpen)
        }}
      >
        <BiDockLeft />
      </Toggle>
      <Toggle
        value={ActionKey.BOTTOM_PANEL}
        aria-label="底部面板"
        title="底部面板"
        size="sm"
        className={clsx(
          // '[&_svg]:size-6',
          // { 'bg-slate-600': bottomPanelOpen }
        )}
        onClick={() => {
          setBottomPanelOpen(!bottomPanelOpen)
        }}
      >
        <BiDockBottom />
      </Toggle>
      <Toggle
        value={ActionKey.PREVIEW_PANEL}
        aria-label="预览"
        title="预览"
        size="sm"
      >
        <BiDesktop />
      </Toggle>
      <ThemeToggle />
    </div>
  </div >
}
