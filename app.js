document.addEventListener('DOMContentLoaded', () => {
    console.log('Application loaded...');


    const quizData = {
        questions: [
            {
                id: 1,
                text: 'Which country won Euro 2024?',
                options: [
                    {
                        id: 1,
                        text: 'France',
                    },
                    {
                        id: 2,
                        text: 'Spain',
                    },
                    {
                        id: 3,
                        text: 'England',
                    },
                ],
                correctOptionId: 2,
            },
            {
                id: 2,
                text: 'Which country won Copa America 2024?',
                options: [
                    {
                        id: 1,
                        text: 'Uruguay',
                    },
                    {
                        id: 2,
                        text: 'Colombia',
                    },
                    {
                        id: 3,
                        text: 'Argentina',
                    },
                ],
                correctOptionId: 3,
            },
            {
                id: 3,
                text: 'Which European club won the 2024 Champions League final?',
                options: [
                    {
                        id: 1,
                        text: 'Real Madrid',
                    },
                    {
                        id: 2,
                        text: 'Borussia Dortmund',
                    },
                    {
                        id: 3,
                        text: 'Manchester City',
                    },
                ],
                correctOptionId: 1,
            }
        ],
    };


    const quizData2 = {
        questions: [
            {
                id: 1,
                text: 'Which country won world  2024?',
                options: [
                    {
                        id: 1,
                        text: 'France',
                    },
                    {
                        id: 2,
                        text: 'Spain',
                    },
                    {
                        id: 3,
                        text: 'England',
                    },
                ],
                correctOptionId: 2,
            },
            {
                id: 2,
                text: 'Which country won Copa America 2024?',
                options: [
                    {
                        id: 1,
                        text: 'Uruguay',
                    },
                    {
                        id: 2,
                        text: 'Colombia',
                    },
                    {
                        id: 3,
                        text: 'Argentina',
                    },
                ],
                correctOptionId: 3,
            },

        ],
    };

    class Question {
        constructor({ id, text, options, correctOptionId }) {
            this.id = id;
            this.text = text;
            this.options = options;
            this.correctOptionId = correctOptionId;
            this.selectedOptionId = null;
        }

        isCorrect() {
            return this.selectedOptionId === this.correctOptionId;
        }
    }

    class Quiz {
        constructor(questions, containerId) {        
            this.questions = questions.map((question) => new Question(question))
            this.container = document.getElementById(containerId)
            this.score = 0;

            console.log(this.container);
        }

        render() {    
            this.container.innerHTML = '';

            const form = document.createElement('form');
            form.id = 'quiz-form';

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.calculateScore();
            });

            const submitBtn = document.createElement('button');

            submitBtn.innerText = 'Submit';
            submitBtn.type = 'submit';       
            
            this.questions.forEach((question) => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question-container');

                const questionText = document.createElement('p');
                questionText.textContent = question.text;

                questionDiv.appendChild(questionText);


                const optionsDiv = document.createElement('div');
                optionsDiv.classList.add('options-container');

                question.options.forEach((option) => {
                    const optionLabel = document.createElement('label');

                    const optionInput = document.createElement('input');
                    optionInput.type = 'radio';
                    optionInput.name = `quetion-${question.id}`;
                    optionInput.value = option.id;

                    optionInput.addEventListener('change', (event) => {
                        question.selectedOptionId = parseInt(optionInput.value);

                        console.log(question);
                    });

                    optionLabel.appendChild(optionInput);
                    optionLabel.appendChild(document.createTextNode(option.text));

                    optionsDiv.appendChild(optionLabel);
                });


                questionDiv.appendChild(optionsDiv);
                form.appendChild(questionDiv);
            });

            form.appendChild(submitBtn);

            this.container.appendChild(form);
        }

        calculateScore() {
            this.score = 0;
            this.questions.forEach((question) => {
                const value = question.isCorrect();

                if (value) {
                    this.score++;
                }
            });

            this.displayResult();
        }

        displayResult() {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `Your score is ${this.score}/${this.questions.length}`;
            this.container.appendChild(resultDiv);
        }
    }


    const quiz1 = new Quiz(quizData.questions, 'quiz-questions');
    quiz1.render();

    const quiz2 = new Quiz(quizData2.questions, 'quiz-questions2')
    quiz2.render();   
});