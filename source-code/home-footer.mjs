import { detailContact } from './detail-contact.mjs';
export function homeFooter({company}){
 return detailContact(company,{id:'home-contact',integratedFooter:true});
}
