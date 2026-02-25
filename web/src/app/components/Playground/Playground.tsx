import styles from "./Playground.module.scss";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useState } from "react";

export default function Playground() {
	const [value, setValue] = useState("console.log('hello world!');");
	const onChange = useCallback((value: string) => {
		console.log("value: ", value);
		setValue(value);
	}, []);
  const extensions = [javascript({ jsx: true })];

	return (
		<div className={styles.container}>
			<CodeMirror
				value={value}
				height="200px"
				extensions={extensions}
        onChange={onChange}
        theme={"dark"}
			/>
		</div>
	);
}
