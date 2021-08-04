import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests } from "./dataAccess.js"



const mainContainer = document.querySelector("#container")


mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

const render = () => {
    fetchRequests().then(
        () => {

            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

