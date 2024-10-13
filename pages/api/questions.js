import questions from '../../../public/questions.json';

export default function handler(req, res) {
    res.status(200).json(questions);
}