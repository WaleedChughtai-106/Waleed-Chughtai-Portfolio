document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const StatsCardContainer = document.querySelector(".stats-card");
  //returns true or false based on a regex
  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    console.log("Matches regex: ", isMatching);
    if (!isMatching) {
      alert("Invalid Username!");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;
      statsContainer.style.setProperty("display", "none");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch the User details");
      }
      const Parseddata = await response.json();

      console.log("Logging data: ", Parseddata);

      if (Parseddata.status === "success" && Parseddata.totalQuestions > 0) {
        DisplayUserData(Parseddata);
      } else {
        statsContainer.innerHTML = `<p>No Data Found</p>`;
      }
    } catch (error) {
      const statsCard = document.querySelector(".stats-card");
      statsCard.innerHTML = `<p>No Data Found</p>`;
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
      statsContainer.style.setProperty("display", "block");
    }
  }
  function UpdateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }
  function DisplayUserData(Parseddata) {
    const totalEasyQues = Parseddata.totalEasy;
    const easySolved = Parseddata.easySolved;

    const totalMediumQues = Parseddata.totalMedium;
    const mediumSolved = Parseddata.mediumSolved;

    const totalHardQues = Parseddata.totalHard;
    const hardSolved = Parseddata.hardSolved;
    const totalQues = Parseddata.totalQuestions;
    const totalSolvedQues = Parseddata.totalSolved;
    const statsCard = document.querySelector(".stats-card");

    UpdateProgress(easySolved, totalEasyQues, easyLabel, easyProgressCircle);
    UpdateProgress(
      mediumSolved,
      totalMediumQues,
      mediumLabel,
      mediumProgressCircle
    );
    UpdateProgress(hardSolved, totalHardQues, hardLabel, hardProgressCircle);
    const acceptanceRate = Parseddata.acceptanceRate;
    const reputation = Parseddata.reputation;
    const Ranking = Parseddata.ranking;
    const statsCardData = [
      { label: "Ranking", value: Ranking },
      { label: "Reputation", value: reputation },
      ,
      { label: "Acceptance Rate", value: acceptanceRate },
    ];
    StatsCardContainer.innerHTML = statsCardData
      .map(
        (data) => `<div class="StatCard_info">
            <span>${data.label}</span>
            <span>${data.value}<span>
        </div>`
      )
      .join("");
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    console.log("Logging username: ", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});
