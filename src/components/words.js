var words = ['bat','car','run','spoil','hello']

export const Randomword = () => {

    var randomIndex = Math.floor(Math.random()*words.length)
    return words[randomIndex]

}