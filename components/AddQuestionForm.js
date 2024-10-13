import { useState } from 'react';

function AddQuestionForm() {
    const categories = ['restapi', 'nextjs', 'javascript'];

    const [newQuestion, setNewQuestion] = useState({
        question: '',
        options: ['', '', ''],
        correctAnswer: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'options') {
            const index = parseInt(event.target.dataset.index);
            const updatedOptions = [...newQuestion.options];
            updatedOptions[index] = value;
            setNewQuestion({ ...newQuestion, options: updatedOptions });
        } else {
            setNewQuestion({ ...newQuestion, [name]: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedQuestions = [...questions];
        updatedQuestions.push(newQuestion);

        // Reset form
        setNewQuestion({
            question: '',
            options: ['', '', ''],
            correctAnswer: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Categoria:
                <select name="category" value={newQuestion.category} onChange={handleChange} required>
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
                    value={newQuestion.question}
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
                        value={newQuestion.options[0]}
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
                        value={newQuestion.options[1]}
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
                        value={newQuestion.options[2]}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <label>
                Răspunsul corect:
                <select name="correctAnswer" value={newQuestion.correctAnswer} onChange={handleChange} required>
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