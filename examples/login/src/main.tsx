import { render, h } from 'omi'
import './app.tsx'
import './index.css'

render(<my-app {...Object.assign({},{validate:()=>1})}/>, document.getElementById('app')!)
