import {BookAccessState} from "@/entities/book.fetch.entity";

export const fetchAccess = (identifier: string, state: {bookAccess: BookAccessState, timer: number}) => {
    state.bookAccess = BookAccessState.LOADING
    console.log("fetching id ", identifier)
    let interval = setInterval(() => {
        state.timer++
        console.log(state.timer)
    }, 1000)

    let elapse = setTimeout(() =>
    {
        state.bookAccess = BookAccessState.FETCHED
        clearInterval(interval)
    }, 5000);



}
