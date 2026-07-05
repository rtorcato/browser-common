import CodeBlock from '@theme/CodeBlock'
import { type ReactElement, useState } from 'react'
import styles from './HeroExamples.module.css'

type Example = {
	id: string
	label: string
	code: string
}

const EXAMPLES: Example[] = [
	{
		id: 'clipboard',
		label: 'clipboard',
		code: `import {
  isClipboardApiAvailable,
  copyToClipboard,
} from '@rtorcato/browser-common/clipboard'

if (isClipboardApiAvailable()) {
  await copyToClipboard('hello world')
}`,
	},
	{
		id: 'geolocation',
		label: 'geolocation',
		code: `import {
  isGeolocationAvailable,
  getCurrentPosition,
} from '@rtorcato/browser-common/geolocation'

if (isGeolocationAvailable()) {
  const pos = await getCurrentPosition()
  console.log(pos?.coords.latitude)
}`,
	},
	{
		id: 'notifications',
		label: 'notifications',
		code: `import {
  requestNotificationPermission,
  showNotification,
} from '@rtorcato/browser-common/notifications'

if (await requestNotificationPermission()) {
  showNotification('Done', { body: 'Upload complete' })
}`,
	},
	{
		id: 'localstorage',
		label: 'localstorage',
		code: `import {
  setLocalStorage,
  getLocalStorage,
} from '@rtorcato/browser-common/localstorage'

setLocalStorage('theme', 'dark')
const theme = getLocalStorage<string>('theme')`,
	},
]

export default function HeroExamples(): ReactElement {
	const [active, setActive] = useState(EXAMPLES[0].id)
	const example = EXAMPLES.find((e) => e.id === active) ?? EXAMPLES[0]

	return (
		<div className={styles.wrap}>
			<div className={styles.tabs} role="tablist" aria-label="Example module">
				{EXAMPLES.map((e) => (
					<button
						key={e.id}
						type="button"
						role="tab"
						aria-selected={active === e.id}
						className={active === e.id ? styles.tabActive : styles.tab}
						onClick={() => setActive(e.id)}
					>
						{e.label}
					</button>
				))}
			</div>
			<div className={styles.codeArea}>
				<CodeBlock language="tsx">{example.code}</CodeBlock>
			</div>
		</div>
	)
}
