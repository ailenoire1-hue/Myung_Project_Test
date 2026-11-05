// Build the company-focused profile using the supplied HTML template.
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const target=fileURLToPath(new URL('./company-brochure-template.mjs',import.meta.url));
if(Number(process.versions.node.split('.')[0])<20){
 const runtime='C:/Users/DG-KIM/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe';
 execFileSync(runtime,[target],{stdio:'inherit'});
}else{
 await import('./company-brochure-template.mjs');
}
