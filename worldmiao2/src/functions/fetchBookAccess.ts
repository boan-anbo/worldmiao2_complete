import {BookAccessFetchingState} from "@/entities/book.fetch.entity";

export const fetchAccess = (identifier: string, state: {bookAccess: BookAccessFetchingState, timer: number}) => {
    state.bookAccess = BookAccessFetchingState.FETCHING
    console.log("fetching id ", identifier)
    let interval = setInterval(() => {
        state.timer++
        console.log(state.timer)
    }, 1000)

    let elapse = setTimeout(() =>
    {
        state.bookAccess = BookAccessFetchingState.FETCHED
        clearInterval(interval)
    }, 5000);



}
