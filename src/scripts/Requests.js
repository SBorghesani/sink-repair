import { getRequests, deleteRequest, saveCompletion, getPlumbers } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now() }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
    )
    

    
    const listedRequests = (request) => {
    const plumbers = getPlumbers()
    return `<li>
        ${request.description}
        <button class="request__delete"
            id="request--${request.id}">
         Delete
        </button>
    
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
    </li>`
}


export const Requests = () => {
    const requests = getRequests()
    
    let html = `
    <ul>
    
    
    ${requests.map(listedRequests).join("")}
    
    
</ul>
`


        
    

    return html
}
