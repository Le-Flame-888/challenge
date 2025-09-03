import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Header from "@/packages/components/Header";

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <div style={{ padding: '16px' }}>
        <Outlet />
      </div>
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  ),
})
