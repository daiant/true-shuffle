import { PropsWithChildren } from "react";

export default function List(props: PropsWithChildren) {
  return <ul style={{ padding: 0, display: "flex", flexDirection: "column", gap: '16px', listStyle: 'none' }}>
    {props.children}
  </ul>
}