import { useState, useEffect } from 'react';

function AddQuestionForm({ categories }) {
    const [questions, setQuestions] = useState(() => {
        const storedQuestions = localStorage.getItem('questions');
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    });

    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionOptions, setNewQuestionOptions] = useState(['', '', '']);
    const [newQuestionAnswer, setNewQuestionAnswer] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'options') {
            const index = parseInt(event.target.dataset.index);
            const updatedOptions = [...newQuestionOptions];
            updatedOptions[index] = value;
            setNewQuestionOptions(updatedOptions);
        } else {
            if (name === 'question') {
                setNewQuestionText(value);
            } else if (name === 'correctAnswer') {
                setNewQuestionAnswer(value);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newQuestionData = {
            question: newQuestionText,
            options: newQuestionOptions,
            correctAnswer: newQuestionAnswer
        };

        const updatedQuestions = [...questions];
        updatedQuestions.push(newQuestionData);

        setQuestions(updatedQuestions);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));

        // Reset form
        setNewQuestionText('');
        setNewQuestionOptions(['', '', '']);
        setNewQuestionAnswer('');
    };

    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questions));
    }, [questions]);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Categorie:
                <select name="category" value={questions.category} onChange={handleChange} required>
                    <option value="">Alege o categorie</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </label>
            <label>
                Întrebarea:
                <input
                    type="text"
                    name="question"
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
                        data-index="2"
                        value={newQuestionOptions[2]}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <label>
                Răspunsul corect:
                <select name="correctAnswer" value={newQuestionAnswer} onChange={handleChange} required>
                    <option value="">Selectează răspunsul corect</option>
                    <option value="0">Răspunsul 1</option>
                    <option value="1">Răspunsul 2</option>
                    <option value="2">Răspunsul 3</option>
                </select>
            </label>
            <button type="submit">Adaugă întrebarea</button>
        </form>
    );
}

export default AddQuestionForm;