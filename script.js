document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const inputSection = document.getElementById('inputSection');
    const quizSection = document.getElementById('quizSection');
    const resultSection = document.getElementById('resultSection');
    const topicInput = document.getElementById('topicInput');
    const generateBtn = document.getElementById('generateBtn');
    const questionsContainer = document.getElementById('questionsContainer');
    const submitBtn = document.getElementById('submitBtn');
    const newQuizBtn = document.getElementById('newQuizBtn');
    const loader = document.getElementById('loader');
    const scoreElement = document.getElementById('score');
    const totalScoreElement = document.getElementById('totalScore');
    const resultDetails = document.getElementById('resultDetails');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    
    // Quiz data
    let quizData = [];
    const numberOfQuestions = 5;
    
    // Event Listeners
    generateBtn.addEventListener('click', generateQuiz);
    submitBtn.addEventListener('click', submitQuiz);
    newQuizBtn.addEventListener('click', resetQuiz);
    
    // Generate quiz based on topic
    function generateQuiz() {
        const topic = topicInput.value.trim();
        
        if (!topic) {
            alert('Please enter a topic');
            return;
        }
        
        // Show loader
        loader.style.display = 'block';
        generateBtn.disabled = true;
        
        // In a real application, you would make an API call here
        // For this demo, we'll simulate an API call with setTimeout
        setTimeout(() => {
            // Generate mock quiz data based on the topic
            quizData = generateMockQuizData(topic, numberOfQuestions);
            
            // Update total questions display
            totalQuestionsElement.textContent = numberOfQuestions;
            
            // Render questions
            renderQuestions();
            
            // Hide loader
            loader.style.display = 'none';
            
            // Switch to quiz section
            inputSection.style.display = 'none';
            quizSection.style.display = 'block';
        }, 1500);
    }
    
    // Generate mock quiz data based on topic
    function generateMockQuizData(topic, count) {
        const mockQuestions = [
            {
                question: `What is the main focus of ${topic}?`,
                options: [
                    `Understanding the core principles of ${topic}`,
                    `Historical development of ${topic}`,
                    `Practical applications of ${topic}`,
                    `Future trends in ${topic}`
                ],
                correctAnswer: 0
            },
            {
                question: `Who is considered the founder of modern ${topic}?`,
                options: [
                    `Albert Einstein`,
                    `Isaac Newton`,
                    `Leonardo da Vinci`,
                    `Marie Curie`
                ],
                correctAnswer: 1
            },
            {
                question: `In what year did ${topic} become widely recognized?`,
                options: [
                    `1905`,
                    `1945`,
                    `1969`,
                    `2001`
                ],
                correctAnswer: 2
            },
            {
                question: `Which country is most associated with advancements in ${topic}?`,
                options: [
                    `United States`,
                    `Germany`,
                    `Japan`,
                    `United Kingdom`
                ],
                correctAnswer: 0
            },
            {
                question: `What is a common misconception about ${topic}?`,
                options: [
                    `It's only theoretical with no practical applications`,
                    `It was discovered recently`,
                    `It's only studied in universities`,
                    `It doesn't impact everyday life`
                ],
                correctAnswer: 3
            },
            {
                question: `Which field is most closely related to ${topic}?`,
                options: [
                    `Physics`,
                    `Biology`,
                    `Computer Science`,
                    `Psychology`
                ],
                correctAnswer: 2
            },
            {
                question: `What is the most significant challenge in ${topic} today?`,
                options: [
                    `Lack of funding`,
                    `Technological limitations`,
                    `Ethical concerns`,
                    `Public understanding`
                ],
                correctAnswer: 2
            }
        ];
        
        // Shuffle and return requested number of questions
        return shuffleArray(mockQuestions).slice(0, count);
    }
    
    // Render quiz questions
    function renderQuestions() {
        questionsContainer.innerHTML = '';
        
        quizData.forEach((questionData, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = `
                <h3>Question ${index + 1}: ${questionData.question}</h3>
                <ul class="options">
                    ${questionData.options.map((option, optionIndex) => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${optionIndex}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            `;
            questionsContainer.appendChild(questionElement);
        });
    }
    
    // Submit quiz and show results
    function submitQuiz() {
        let score = 0;
        let answeredAll = true;
        
        quizData.forEach((questionData, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            
            if (!selectedOption) {
                answeredAll = false;
                return;
            }
            
            if (parseInt(selectedOption.value) === questionData.correctAnswer) {
                score++;
            }
        });
        
        if (!answeredAll) {
            alert('Please answer all questions');
            return;
        }
        
        // Display results
        scoreElement.textContent = score;
        totalScoreElement.textContent = quizData.length;
        
        // Generate result details
        resultDetails.innerHTML = '';
        quizData.forEach((questionData, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            const isCorrect = parseInt(selectedOption.value) === questionData.correctAnswer;
            
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${questionData.question}</p>
                <p>Your answer: ${questionData.options[parseInt(selectedOption.value)]}</p>
                <p>Correct answer: ${questionData.options[questionData.correctAnswer]}</p>
                <p style="color: ${isCorrect ? 'green' : 'red'}">
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </p>
                <hr>
            `;
            resultDetails.appendChild(resultItem);
        });
        
        // Switch to result section
        quizSection.style.display = 'none';
        resultSection.style.display = 'block';
    }
    
    // Reset quiz to start over
    function resetQuiz() {
        topicInput.value = '';
        quizData = [];
        
        // Switch back to input section
        resultSection.style.display = 'none';
        quizSection.style.display = 'none';
        inputSection.style.display = 'block';
        
        // Enable generate button
        generateBtn.disabled = false;
    }
    
    // Utility function to shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
});