export interface Observer<T = {}> {
    notify: (data? :T) => void; 
}