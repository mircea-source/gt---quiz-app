import { useState, useEffect } from 'react';
import questionsData from '../public/questions.json'; // Adjust the path as necessary
import styles from '../styles/Category.module.css';


function AddQuestionForm({ categories }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            // Load questions from JSON file and save to localStorage
            const allQuestions = [];
            for (const category in questionsData.category) {
                if (questionsData.category.hasOwnProperty(category)) {
                    questionsData.category[category].questions.forEach(question => {
                        allQuestions.push({ ...question, category });
                    });
                }
            }
            localStorage.setItem('questions', JSON.stringify(allQuestions));
            setQuestions(allQuestions);
        }
    }, []);

    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionOptions, setNewQuestionOptions] = useState(['', '', '']);
    const [newQuestionAnswer, setNewQuestionAnswer] = useState('');
    const [newQuestionCategory, setNewQuestionCategory] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'options') {
            const index = parseInt(event.target.dataset.index);
            const updatedOptions = [...newQuestionOptions];
            updatedOptions[index] = value;
            setNewQuestionOptions(updatedOptions);
        } else if (name === 'category') {
            setNewQuestionCategory(value);
        } else if (name === 'question') {
            setNewQuestionText(value);
        } else if (name === 'answer') {
            setNewQuestionAnswer(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (typeof window !== 'undefined' && window.localStorage) {
            const existingQuestions = JSON.parse(localStorage.getItem('questions')) || [];

            const newQuestion = {
                category: newQuestionCategory,
                question: newQuestionText,
                options: newQuestionOptions,
                answer: newQuestionAnswer
            };

            const updatedQuestions = [...existingQuestions, newQuestion];
            localStorage.setItem('questions', JSON.stringify(updatedQuestions));

            setNewQuestionCategory('');
            setNewQuestionText('');
            setNewQuestionOptions(['', '', '']);
            setNewQuestionAnswer('');
        } else {
            console.error('localStorage is not available');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Categoria:
                <select name="category" value={newQuestionCategory} onChange={handleChange} required>
                    <option value="">Alege o categorie</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </label>
            <label>
                Întrebarea:
                <input
                    type="text"
                    name="question"
                    className={styles.text}
                    value={newQuestionText}
                    onChange={handleChange}
                    required
                />
            </label>
            <div>
                <label>
                    Răspunsul 1:
                    <input
                        type="text"
                        name="options"
                        className={styles.text}
                        data-index="0"
                        value={newQuestionOptions[0]}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Răspunsul 2:
                    <input
                        type="text"
                        name="options"
                        className={styles.text}
                        data-index="1"
                        value={newQuestionOptions[1]}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Răspunsul 3:
                    <input
                        type="text"
                        name="options"
                        className={styles.text}
                        data-index="2"
                        value={newQuestionOptions[2]}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <label>
                Răspunsul corect:
                <select name="answer" value={newQuestionAnswer} onChange={handleChange} required>
                    <option value="">Alege răspunsul corect</option>
                    <option value="0">Răspunsul 1</option>
                    <option value="1">Răspunsul 2</option>
                    <option value="2">Răspunsul 3</option>
                </select>
            </label>
            <button type="submit" className={styles.main} >Adaugă întrebarea</button>
        </form>
    );
}

export default AddQuestionForm;