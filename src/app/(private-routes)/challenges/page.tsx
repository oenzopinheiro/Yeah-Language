import { HomeTemplate } from "@/app/modules/home/template/Home";
import units from "@/data/units.json"

export default function Challenges() {
   return(
    <main>
        <HomeTemplate units={units.content}/>
    </main>
    )
}