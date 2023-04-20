import { PropsWithChildren } from "react";

export default function Title(props: PropsWithChildren) {
  return <p style={{ marginBlock: "1rem", paddingBlockEnd: '0.5rem', fontSize: '24px', fontWeight: 'bold', borderBottom: '1px solid white' }}>
    {props.children}
  </p>
}