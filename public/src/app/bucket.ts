export class Bucket{
    constructor (
        public title: string = '',
        public description: string = '',
        public tagged: String = '',
        public checked: Boolean = false,
        public _users = []) {}
}
