import { useState, useEffect } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const WORDS = ['REACT', 'GAMES', 'MATCH', 'VOICE', 'FRIEND', 'DATING', 'SOCIAL', 'CONNECT']

export default function WordGuess({ mode, onBack, opponent }) {
  const [word, setWord] = useState('')
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setWord(randomWord)
    setGuesses([])
    setCurrentGuess('')
    setGameOver(false)
    setWon(false)
  }

  const handleSubmitGuess = () => {
    if (currentGuess.length !== word.length) return
    
    const newGuesses = [...guesses, currentGuess.toUpperCase()]
    setGuesses(newGuesses)
    
    if (currentGuess.toUpperCase() === word) {
      setWon(true)
      setGameOver(true)
    } else if (newGuesses.length >= 6) {
      setGameOver(true)
    }
    
    setCurrentGuess('')
  }

  const getLetterColor = (letter, index, guess) => {
    if (word[index] === letter) {
      return 'bg-green-500 text-white'
    } else if (word.includes(letter)) {
      return 'bg-yellow-500 text-white'
    } else {
      return 'bg-gray-400 text-white'
    }
  }

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Word Guess</h2>
        <Button onClick={startNewGame} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          New
        </Button>
      </div>

      {gameOver && (
        <div className={`mb-4 p-4 rounded-xl text-white ${won ? 'gradient-purple' : 'bg-destructive'}`}>
          <p className="text-xl font-bold">
            {won ? '🎉 You Won!' : `Game Over! The word was: ${word}`}
          </p>
        </div>
      )}

      <div className="space-y-2 mb-6">
        {guesses.map((guess, guessIndex) => (
          <div key={guessIndex} className="flex justify-center space-x-2">
            {guess.split('').map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-lg ${getLetterColor(letter, letterIndex, guess)}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
        
        {!gameOver && guesses.length < 6 && (
          <div className="flex justify-center space-x-2">
            {Array(word.length).fill(null).map((_, index) => (
              <div
                key={index}
                className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-lg border-2 border-border bg-muted"
              >
                {currentGuess[index] || ''}
              </div>
            ))}
          </div>
        )}
      </div>

      {!gameOver && (
        <div className="space-y-4">
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitGuess()}
            maxLength={word.length}
            placeholder={`Enter ${word.length}-letter word`}
            className="w-full px-4 py-3 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center text-xl font-bold uppercase"
          />
          <Button
            onClick={handleSubmitGuess}
            disabled={currentGuess.length !== word.length}
            className="w-full gradient-purple text-white"
          >
            Submit Guess
          </Button>
          <p className="text-sm text-muted-foreground">
            Guesses remaining: {6 - guesses.length}
          </p>
        </div>
      )}
    </div>
  )
}

