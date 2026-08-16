(() => {
  const form = document.querySelector("#diagnostic-form");
  const result = document.querySelector("#diagnostic-result");
  if (!form || !result) return;

  const questions = [...form.querySelectorAll(".diagnostic-question")];
  const placeholder = result.querySelector("[data-result-placeholder]");
  const content = result.querySelector("[data-result-content]");
  const scoreOutput = result.querySelector("[data-score]");
  const scoreProgress = result.querySelector("[data-score-progress]");
  const levelOutput = result.querySelector("[data-level]");
  const levelCopy = result.querySelector("[data-level-copy]");
  const recommendations = result.querySelector("[data-recommendations]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let interactionMode = "pointer";

  const levels = [
    { minimum: 75, title: "Fondations solides", copy: "Les protections essentielles sont bien engagées. Maintenez-les, testez-les et documentez les changements." },
    { minimum: 50, title: "Protection intermédiaire", copy: "Plusieurs bonnes pratiques sont en place, mais certaines lacunes pourraient faciliter un incident évitable." },
    { minimum: 0, title: "Priorités à consolider", copy: "Commencez par quelques mesures à fort impact. Une progression simple et régulière vaut mieux qu'une solution trop complexe." },
  ];

  questions[0]?.classList.add("is-current");
  form.addEventListener("pointerdown", () => {
    interactionMode = "pointer";
  });
  form.addEventListener("keydown", () => {
    interactionMode = "keyboard";
  });

  questions.forEach((question, index) => {
    question.addEventListener("change", (event) => {
      if (!(event.target instanceof HTMLInputElement) || event.target.type !== "radio") return;
      question.classList.add("is-answered");
      questions.forEach((item) => item.classList.remove("is-current"));
      const nextQuestion = questions[index + 1];
      const nextTarget = nextQuestion || form.querySelector(".diagnostic-actions");
      nextQuestion?.classList.add("is-current");
      if (interactionMode !== "pointer" || !nextTarget) return;
      window.setTimeout(() => {
        nextTarget.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: nextQuestion ? "center" : "end",
        });
      }, 140);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const unanswered = questions.find((question) => !formData.has(question.querySelector("input").name));
    if (unanswered) {
      unanswered.querySelector("input").focus();
      return;
    }

    const answers = questions.map((question) => ({
      passed: formData.get(question.querySelector("input").name) === "1",
      recommendation: question.dataset.recommendation,
    }));
    const score = Math.round((answers.filter((answer) => answer.passed).length / answers.length) * 100);
    const level = levels.find((item) => score >= item.minimum);
    const priorities = answers.filter((answer) => !answer.passed).slice(0, 3);

    scoreOutput.textContent = String(score);
    scoreProgress.value = score;
    scoreProgress.textContent = `${score} %`;
    levelOutput.textContent = level.title;
    levelCopy.textContent = level.copy;
    recommendations.replaceChildren();

    if (priorities.length) {
      priorities.forEach((priority) => {
        const item = document.createElement("li");
        item.textContent = priority.recommendation;
        recommendations.append(item);
      });
    } else {
      const item = document.createElement("li");
      item.textContent = "Planifiez une revue périodique et testez vos procédures de restauration et de réponse à incident.";
      recommendations.append(item);
    }

    placeholder.hidden = true;
    content.hidden = false;
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  form.addEventListener("reset", () => {
    placeholder.hidden = false;
    content.hidden = true;
    scoreProgress.value = 0;
    recommendations.replaceChildren();
    questions.forEach((question, index) => {
      question.classList.remove("is-answered", "is-current");
      if (index === 0) question.classList.add("is-current");
    });
  });
})();
