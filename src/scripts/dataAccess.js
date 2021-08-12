const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")




export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completion`)
    .then(response => response.json())
    .then (
        (completionObject) => {
            applicationState.completion = completionObject
        }
    )
}

const applicationState = {
    plumbers: [],
    requests: []
}

// export const getPlumber = () => {
//     return applicationState.plumbers.map(plumber => ({...plumber}))
// }
export const getPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json()) 
        .then( (plumberData) => {
            console.log(plumberData)
            applicationState.plumbers = plumberData
            
        }
    )
}


export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const saveCompletion = (completionObject) => {
    const fetchCompletions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObject)
    }

    return fetch(`${API}/completion`, fetchCompletions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

