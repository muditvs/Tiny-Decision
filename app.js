let decisions = JSON.parse(localStorage.getItem('decisions')) || [];
const decisionForm = document.querySelector('#decision-form');
const decisionHistoryList = document.querySelector('#decision-history');

function renderDecisionHistory() {
  decisionHistoryList.innerHTML = '';

  if (decisions.length === 0) {
    decisionHistoryList.innerHTML = '<li>No decisions yet.</li>';
    return;
  }

  decisions.forEach((decision) => {
    const decisionItem = document.createElement('li');
    decisionItem.classList.add('decision-item');

    if (decision.reflection && decision.reflection.toLowerCase().includes("regret")) {
      decisionItem.style.backgroundColor = '#ff4d4d';
      decisionItem.style.color = 'white';
    }

    decisionItem.innerHTML = `
      <h3>${decision.title}</h3>
      <p class="status ${decision.status}">${decision.status === 'thinking' ? '🟡 Thinking' : '✅ Made'}</p>
      <a href="#" onclick="viewDecisionDetails(${decision.id})">${decision.status === 'thinking' ? 'Reflect Now' : 'View / Update Reflection'}</a>
    `;
    decisionHistoryList.appendChild(decisionItem);
  });
}

decisionForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#decision-title').value;
  const pros = document.querySelector('#decision-pros').value;
  const cons = document.querySelector('#decision-cons').value;
  const status = document.querySelector('#decision-status').value;

  if (!title) return;

  const newDecision = {
    id: Date.now(),
    title,
    pros,
    cons,
    status,
    finalChoice: '',
    explanation: '',
    reflection: '',
  };

  decisions.unshift(newDecision);
  localStorage.setItem('decisions', JSON.stringify(decisions));
  decisionForm.reset();
  renderDecisionHistory();
});

function viewDecisionDetails(id) {
  const decision = decisions.find(d => d.id === id);
  if (!decision) return;

  const finalChoice = prompt('What did you decide?', decision.finalChoice);
  const explanation = prompt('Why did you make this choice?', decision.explanation);
  const reflection = prompt('Was it a good decision?', decision.reflection);

  decision.finalChoice = finalChoice;
  decision.explanation = explanation;
  decision.reflection = reflection;

  localStorage.setItem('decisions', JSON.stringify(decisions));
  renderDecisionHistory();
}

document.addEventListener('DOMContentLoaded', () => {
  renderDecisionHistory();
});
