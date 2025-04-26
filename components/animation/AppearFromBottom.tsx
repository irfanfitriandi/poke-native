import { MotiView } from 'moti'
import type { PropsWithChildren } from 'react'
import type { ViewProps } from 'react-native'

interface AppearFromBottomProps extends ViewProps {
  index?: number
}

const from = {
  opacity: 0,
  translateY: 50,
}

const to = {
  opacity: 1,
  translateY: 0,
}

const AppearFromBottom = ({
  index = 0,
  style,
  children,
  ...props
}: PropsWithChildren<AppearFromBottomProps>) => {
  return (
    <MotiView
      from={from}
      animate={to}
      exit={from}
      transition={{
        delay: index * 200,
      }}
      style={[{ flex: 1 }, style]}
      {...props}
    >
      {children}
    </MotiView>
  )
}

export default AppearFromBottom
