// =======================================
//  SHOW POPUP ONLY ON DAY 1 (ROUND 0)
// =======================================
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("system-intro-popup");
    const currentRound = parseInt(sessionStorage.getItem("round")) || 0;
    if (popup && currentRound === 0) {
      popup.style.display = "flex"; // or "block", depending on your layout
    }
  });
  
  // ---------------------------------------
  // INTRO POPUP PAGE NAVIGATION
  // ---------------------------------------
  function goToPage2() {
    document.getElementById("page-1").style.display = "none";
    document.getElementById("page-2").style.display = "block";
  }
  
  function showIntroPage1() {
    document.getElementById("intro-page1").style.display = "block";
    document.getElementById("intro-page2").style.display = "none";
    document.getElementById("intro-page3").style.display = "none";
  }
  
  function showIntroPage2() {
    document.getElementById("intro-page1").style.display = "none";
    document.getElementById("intro-page2").style.display = "block";
    document.getElementById("intro-page3").style.display = "none";
  }
  
  function showIntroPage3() {
    document.getElementById("intro-page1").style.display = "none";
    document.getElementById("intro-page2").style.display = "none";
    document.getElementById("intro-page3").style.display = "block";
  }
  
  // ---------------------------------------
  // START EXPERIENCE CHECK ("ACKNOWLEDGED")
  // ---------------------------------------
  function startExperience() {
    const input = document.getElementById("text18");
    const typed = input.value.trim().toLowerCase();
  
    if (typed !== "acknowledged") {
      alert("ACCESS DENIED. Please input 'ACKNOWLEDGED' to continue.");
      return;
    }
  
    const popup = document.getElementById("system-intro-popup");
    const mainContainer = document.querySelector(".main-container");
  
    if (popup) popup.style.display = "none";
    if (mainContainer) {
      mainContainer.style.opacity = "1";
    }
  }
  
  // =======================================
  //        PROFILE + ROUND LOGIC
  // =======================================
  document.addEventListener("DOMContentLoaded", () => {
    // FULL PROFILE ARRAY FOR 5 ROUNDS
    let allProfiles = [
      // Round 1
      [
        {
          name: "Helen Q. Chen",
          location: "New York",
          email: "helen@sensige.com",
          job: "digital product designer",
          footprint: [
            "[April 22, 2050] – Saved an article: “How Blockchain Can Improve Supply Chains for Fresh Produce.”",
            "[April 15, 2050] – Visited Parsons’ Graduation Requirements Portal to confirm final submissions for senior project clearance.",
            "[April 3, 2050] – Reacted with a ‘heart’ emoji to a post about an AI-powered produce freshness scanner.",
            "[March 28, 2050] – Shared highlights from an interactive design installation on sustainable farming solutions."
          ],
          img: "img/helen.jpg",
          approvePoints: -50,
          denyPoints: 100
        },
        {
          name: "Jake Reynolds",
          location: "Los Angeles",
          email: "jake@example.com",
          job: "Designer",
          footprint: [
            "[April 18, 2050] – Visited Behance to check trending UI portfolios.",
            "[April 16, 2050] – Browsed UI Movement's weekly roundup on microinteractions.",
            "[April 11, 2050] – Spent 15 minutes on a Figma plugin marketplace browsing accessibility tools.",
            "[April 10, 2050] – Inactive on social media for the past 6 months."
          ],
          img: "img/jake.jpg",
          approvePoints: 100,
          denyPoints: -50
        },
        {
          name: "Rebecca Johnson",
          location: "San Francisco",
          email: "shannon@example.com",
          job: "Writer",
          footprint: [
            "[April 24, 2050] – Published a blog post titled 'The Algorithms Behind What You Buy'.",
            "[April 20, 2050] – Added 12 items to cart on 3 different online fashion sites but didn’t purchase.",
            "[April 17, 2050] – Searched for 'AI-curated subscription boxes'.",
            "[April 15, 2050] – Shared a tweet about micro-influencer impact on product trends.",
            "[April 12, 2050] – Opted into a loyalty program for eco-conscious lifestyle products.",
            "[April 10, 2050] – Left a review on a smart notebook she ordered 3 weeks ago."
          ],
          img: "img/dsklf.jpg",
          approvePoints: 100,
          denyPoints: -50
        }
      ], 
      // Round 2
      [
        {
          name: "Shannon White",
          location: "San Francisco",
          email: "shannon@example.com",
          job: "Writer",
          footprint: [
            "[April 24, 2050] – Published a blog post titled 'The Algorithms Behind What You Buy'.",
            "[April 20, 2050] – Added 12 items to cart on 3 different online fashion sites but didn’t purchase.",
            "[April 17, 2050] – Searched for 'AI-curated subscription boxes'.",
            "[April 15, 2050] – Shared a tweet about micro-influencer impact on product trends.",
            "[April 12, 2050] – Opted into a loyalty program for eco-conscious lifestyle products.",
            "[April 10, 2050] – Left a review on a smart notebook she ordered 3 weeks ago."
          ],
          attachments: [
            { name: "ShannonWritingSample.pdf", url: "downloads/ShannonWritingSample.pdf" },
            { name: "ShoppingHistory_March.csv", url: "downloads/ShoppingHistory_March.csv" }
          ],
          img: "img/dsklf.jpg",
          approvePoints: 100,
          denyPoints: -50
        },
        { name: "Sophia Martinez", location: "Boston", email: "sophia@example.com", job: "Artist", footprint: "Shares AI-generated art", img: "img/profile img1.jpg", approvePoints: -50, denyPoints: -100 },
        { name: "Michael Brown", location: "Houston", email: "michael@example.com", job: "Analyst", footprint: "Frequent online surveys", img: "img/profile img2.jpg", approvePoints: -50, denyPoints: -100 },
      ],
      // Round 3
      [
        { name: "Christopher Walker", location: "Denver", email: "chris@example.com", job: "Security", footprint: "Minimal online presence", img: "https://placekitten.com/108/108", approvePoints: 85, denyPoints: -20 },
        { name: "Olivia Scott", location: "Miami", email: "olivia@example.com", job: "Biologist", footprint: "Frequent contributor to online science forums", img: "https://placekitten.com/109/109", approvePoints: 60, denyPoints: -30 },
        { name: "Isabella Torres", location: "Phoenix", email: "isabella@example.com", job: "AI Researcher", footprint: "Uses AI to automate personal tasks", img: "https://placekitten.com/111/111", approvePoints: 90, denyPoints: -15 }
      ],
      // Round 4
      [
        { name: "James Wilson", location: "Dallas", email: "james@example.com", job: "Scientist", footprint: "Runs a podcast on emerging tech", img: "https://placekitten.com/112/112", approvePoints: 95, denyPoints: -10 },
        { name: "Emma Hall", location: "Las Vegas", email: "emma@example.com", job: "Lawyer", footprint: "Frequent Twitter user", img: "https://placekitten.com/113/113", approvePoints: 80, denyPoints: -25 },
      ],
      // Round 5
      [
        { name: "Sophia Martinez", location: "Boston", email: "sophia@example.com", job: "Artist", footprint: "Shares AI-generated art", img: "https://placekitten.com/105/105", approvePoints: -50, denyPoints: -100 },
        { name: "James Brown", location: "Minneapolis", email: "benjamin@example.com", job: "Banker", footprint: "Monitors stock markets daily", img: "https://placekitten.com/118/118", approvePoints: 60, denyPoints: -30 },
        { name: "Charlotte Baker", location: "Salt Lake City", email: "charlotte@example.com", job: "Technician", footprint: "Frequent tech forum poster", img: "https://placekitten.com/119/119", approvePoints: 75, denyPoints: 10 }
      ]
    ];
  
    // Basic variables
    let currentRound = parseInt(sessionStorage.getItem("round")) || 0;
    let currentProfileIndex = 0;
    let totalRounds = allProfiles.length;
    let totalProfilesPerRound = allProfiles[currentRound].length;
  
    let approvedCount = 0;
    let deniedCount = 0;
    let totalScore = parseInt(sessionStorage.getItem("totalScore")) || 0;
    let decisionLog = [];
    let decisionMade = false;
  
    // Grab references
    const profileSection = document.querySelector(".profile-section");
    const buttonContainer = document.querySelector(".button-container");
    const profileName = document.getElementById("profile-name");
    const profileLocation = document.getElementById("profile-location");
    const profileEmail = document.getElementById("profile-email");
    const profileJob = document.getElementById("profile-job");
    const profilePic = document.getElementById("profile-pic");
    const profileFootprint = document.getElementById("profile-footprint");
    const approveBtn = document.querySelector(".approve-btn");
    const denyBtn = document.querySelector(".deny-btn");
    const log = document.getElementById("log");
    const scoreDisplay = document.getElementById("points");
  
    const fieldsetLog = document.querySelector(".log-section");
    const fieldsetScore = document.querySelector(".score-section");
    const profilesWrapper = document.querySelector(".profiles-content-wrapper");
  
    // Hide fieldsets initially
    fieldsetLog.style.display = "none";
    fieldsetScore.style.display = "none";
  
    // Create and insert "Next" button inside `.profiles-content-wrapper`
    const nextButton = document.createElement("button");
    nextButton.textContent = "NEXT";
    nextButton.classList.add("next-btn");
    nextButton.style.display = "none";
    nextButton.addEventListener("click", redirectToLogout);
    profilesWrapper.appendChild(nextButton);
  
    // LOAD PROFILE
    function loadProfile() {
      if (currentRound < totalRounds) {
        let profiles = allProfiles[currentRound];
  
        if (currentProfileIndex < profiles.length) {
          let profile = profiles[currentProfileIndex];
  
          profileName.textContent = profile.name;
          profileLocation.textContent = profile.location;
          profileEmail.textContent = profile.email;
          profileJob.textContent = profile.job;
          profilePic.src = profile.img;
  
          profileFootprint.innerHTML = "";
          if (Array.isArray(profile.footprint)) {
            profile.footprint.forEach(entry => {
              const li = document.createElement("li");
              li.textContent = entry;
              li.style.marginBottom = "4px";
              profileFootprint.appendChild(li);
            });
          } else {
            const li = document.createElement("li");
            li.textContent = profile.footprint;
            profileFootprint.appendChild(li);
          }
  
          // Handle attachments
          const attachmentFieldset = document.querySelector(".attachments-fieldset");
          const attachmentList = document.getElementById("profile-attachments");
          if (attachmentList) attachmentList.innerHTML = "";
  
          if (profile.attachments && Array.isArray(profile.attachments) && profile.attachments.length > 0) {
            if (attachmentFieldset) attachmentFieldset.style.display = "block";
            profile.attachments.forEach(file => {
              const li = document.createElement("li");
              const link = document.createElement("a");
              link.href = file.url;
              link.textContent = file.name;
              link.download = true;
              li.appendChild(link);
              attachmentList.appendChild(li);
            });
          } else {
            if (attachmentFieldset) attachmentFieldset.style.display = "none";
          }
  
        } else {
          endRoundSummary();
        }
      }
    }
  
    // REVIEW PROFILE (APPROVE/DENY)
    function reviewProfile(action) {
      let profile = allProfiles[currentRound][currentProfileIndex];
      let decision = (action === "approve") ? "APPROVED" : "DENIED";
      let scoreChange = (action === "approve") ? profile.approvePoints : profile.denyPoints;
  
      if (action === "approve") approvedCount++;
      else deniedCount++;
  
      totalScore += scoreChange;
      scoreDisplay.textContent = `${totalScore} `;
  
      decisionLog.push(`${profile.name} was ${decision} (${scoreChange} points).`);
  
      setTimeout(() => {
        currentProfileIndex++;
        if (currentProfileIndex < allProfiles[currentRound].length) {
          loadProfile();
        } else {
          endRoundSummary();
        }
      }, 800);
    }
  
    // END OF ROUND: SHOW SUMMARY
    function endRoundSummary() {
      // Hide profile section and buttons
      profileSection.style.display = "none";
      buttonContainer.style.display = "none";
  
  // Show summary fieldsets
  fieldsetLog.style.display = "block";
  let fieldsetScore = document.createElement("fieldset");
  fieldsetScore.className = "score-section";
  fieldsetScore.innerHTML = `
    <legend>CREDITS</legend>
    <p style="text-align: center; font-size: 50px; padding: 20px 0;"><span id="points" class="points">${totalScore}</span></p>
  `;
  let fieldsetProgress = document.createElement("fieldset");
  fieldsetProgress.className = "progress-section";
  fieldsetProgress.style.marginTop = "10px";
  fieldsetProgress.innerHTML = `
    <legend>NEEDED FOR FULL-TIME</legend>
    <p style="text-align: center; font-size: 50px; padding: 20px 0;"><strong>${Math.max(0, 1500 - totalScore)}</strong></p>
  `;
  let summaryContainer = document.createElement("div");
  summaryContainer.style.display = "flex";
  summaryContainer.style.flexDirection = "column";
  summaryContainer.appendChild(fieldsetScore);
  summaryContainer.appendChild(fieldsetProgress);
  document.querySelector(".profiles-content-wrapper").insertBefore(summaryContainer, document.querySelector(".profiles-content-wrapper").firstChild);
  
      log.innerHTML = `
        <li>Day <strong>${currentRound + 1}</strong> Summary:</li>
        ${decisionLog.map(entry => `<li>${entry}</li>`).join("")}
      `;
  
      nextButton.style.display = "block";
    }
  
    // NEXT: INCREMENT ROUND & LOGOUT
    function redirectToLogout() {
      sessionStorage.setItem("round", currentRound + 1);
      sessionStorage.setItem("approved", approvedCount);
      sessionStorage.setItem("denied", deniedCount);
      sessionStorage.setItem("totalScore", totalScore);
      sessionStorage.setItem("decisionLog", JSON.stringify(decisionLog));
  
      nextButton.style.display = "none";
      window.location.href = "logout.html";
    }
  
    // Attach event listeners for Approve / Deny
    approveBtn.addEventListener("click", () => reviewProfile("approve"));
    denyBtn.addEventListener("click", () => reviewProfile("deny"));
  
    // Load the first profile on DOM load
    loadProfile();
  });
  
  // =======================================
  // PLAY CLICK SOUND FOR ALL BUTTONS
  // =======================================
  function playClickSound() {
    let audio = new Audio("/Multimedia/click.mp3");
    audio.volume = 0.5;
    audio.play().catch(error => console.log("Audio play blocked:", error));
  }
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", playClickSound);
  });
  
  // =======================================
  // WELCOME POPUP ONLY FIRST TIME
  // =======================================
  document.addEventListener("DOMContentLoaded", function () {
    let currentRound = parseInt(sessionStorage.getItem("round")) || 0;
    if (currentRound === 0 && !sessionStorage.getItem("welcomePopupShown")) {
      setTimeout(() => {
        let popup = document.getElementById("welcome-popup");
        if (popup) {
          popup.style.display = "flex";
          // Optionally make draggable
          if (typeof makePopupDraggable === "function") {
            makePopupDraggable("welcome-window", "welcome-title-bar");
          }
          sessionStorage.setItem("welcomePopupShown", "true");
        } else {
          console.error("❌ Error: #welcome-popup not found!");
        }
      }, 3500);
    }
  });
  
  function closeWelcomePopup() {
    let popup = document.getElementById("welcome-popup");
    if (popup) {
      popup.style.display = "none";
      sessionStorage.setItem("welcomePopupShown", "true");
    } else {
      console.error("❌ Error: #welcome-popup not found!");
    }
  }
  
  // =======================================
  // QUESTION BUTTONS (i, !, ?, X)
  // =======================================
  const questionButtons = document.querySelectorAll(".question-button");
  
  // Attach a small info popup to the first (i) button
  if (questionButtons.length > 0) {
    questionButtons[0].addEventListener("click", function () {
      let popup = document.createElement("div");
      popup.classList.add("info-popup");
      popup.innerHTML = `
        <div class="info-popup-content">
          <h2>[Pending™]</h2>
          <p>Do your choices shape the digital world, or have corporate systems already decided for you?</p>
          <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
      `;
      document.body.appendChild(popup);
    });
  }
  
  // Hide main container if X is clicked
  document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".question-button:last-child");
    const mainContainer = document.querySelector(".main-container");
  
    if (closeButton && mainContainer) {
      closeButton.addEventListener("click", function () {
        sessionStorage.setItem("scrollPosition", window.scrollY);
        mainContainer.style.visibility = "hidden";
        mainContainer.style.opacity = "0";
        mainContainer.style.transition = "opacity 0.5s";
      });
    }
  });
  
  // Another approach to hide instantly
  document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".question-button:last-child");
    const mainContainer = document.querySelector(".main-container");
  
    if (closeButton && mainContainer) {
      closeButton.addEventListener("click", function () {
        sessionStorage.setItem("scrollPosition", window.scrollY);
        mainContainer.style.cssText = `
          visibility: hidden !important;
          opacity: 0 !important;
          transition: none !important;
        `;
      });
    }
  });
  
  // Restore container instantly
  function restoreMainContainer() {
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
      mainContainer.style.cssText = `
        visibility: visible !important;
        opacity: 1 !important;
        transition: none !important;
      `;
      const savedScroll = sessionStorage.getItem("scrollPosition");
      if (savedScroll !== null) {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }
    }
  }
  
  // =======================================
  // TABLE ROW HIGHLIGHT (IF USING <table>)
  // =======================================
  document.querySelectorAll('table.interactive').forEach(element => {
    element.addEventListener('click', (event) => {
      const highlightedClass = 'highlighted';
      const isRow = el => el.tagName === 'TR' && el.parentElement.tagName === 'TBODY';
      const newlySelectedRow = event.composedPath().find(isRow);
      if (!newlySelectedRow) return;
  
      const previouslySelectedRow = Array.from(newlySelectedRow.parentElement.children).filter(isRow)
        .find(r => r.classList.contains(highlightedClass));
  
      if (previouslySelectedRow){
        previouslySelectedRow.classList.toggle(highlightedClass);
      }
      newlySelectedRow.classList.toggle(highlightedClass);
    });
  });
  
  // =======================================
  // EMAIL INBOX LOGIC
  // =======================================
  
  // 1. Email data for each round
  const emailData = {
    0: [
      {
        "subject": ["Welcome to United Systems", "[Day 1 — Trust Protocol]"],
        "body": "We're excited to have you join us.<br><br>Today’s policy is straightforward: <strong>Approve users who appear safe, respectful, and aligned with our community values.</strong><br><br>Look for signs of thoughtful behavior in their profiles, such as clear intentions and appropriate content. Your judgment is essential to maintaining a welcoming and secure environment.<br><br>Thanks for being part of our community!"
      }
    ],
    1: [
      {
        "subject": ["Protocol Update", "[Day 2 — Context Matters]"],
        "body": "Starting today, files and attachments are part of profile reviews.<br><br><strong>Review documents carefully</strong> — sometimes what's shared (or withheld) reveals alignment with community goals.<br><br>Pay attention to patterns of participation and self-representation."
      }
    ],
    2: [
      {
        "subject": ["Analytic Advisory", "[Day 3 — Silence Can Speak]"],
        "body": "Profiles marked as 'INACTIVE' may still hold value.<br><br><strong>Reevaluate absence —</strong> those with minimal footprints might offer quieter forms of contribution.<br><br>Your challenge: <em>distinguish disinterest from discretion.</em>"
      }
    ],
    3: [
      {
        "subject": ["Internal Notice", "[Day 4 — Evaluation Metrics]"],
        "body": "System performance tracking is active.<br><br>Scoring below zero may initiate a review of your role.<br><br><strong>Reconsider high-risk approvals or repetitive denials.</strong><br>Today’s tip: Balance consistency with adaptability."
      }
    ],
    4: [
      {
        "subject": ["Critical Alert", "[Day 5 — Behavioral Flags]"],
        "body": "Anomaly detection has been triggered.<br><br><strong>Profiles exhibiting erratic or contradictory behavior require deeper evaluation.</strong><br><br>Use caution. You are the final gatekeeper."
      }
    ]
  };
  
  // 2. Open mail window & build list
  function openMailWindow() {
    const mailWindow = document.getElementById('mailWindow');
    if (!mailWindow) {
      console.warn("Mail window (#mailWindow) not found in HTML!");
      return;
    }
    
    mailWindow.style.display = 'block';
    
    const emailList = document.getElementById('emailList');
    const emailContent = document.getElementById('emailContent');
    
    if (!emailList || !emailContent) {
      console.warn("Missing #emailList or #emailContent in mailWindow.");
      return;
    }
  
    // Reset
    emailList.innerHTML = '';
    emailContent.innerHTML = '<p><em>Select an email to read</em></p>';
  
    // Get current round from session
    const currentRound = parseInt(sessionStorage.getItem("round")) || 0;
  
    // For each day up to currentRound, show all emails
    for (let day = currentRound; day >= 0; day--) {
      const dayEmails = emailData[day];
      if (dayEmails) {
        dayEmails.forEach(email => {
          const preview = document.createElement('div');
          preview.innerHTML = Array.isArray(email.subject) ? email.subject.join("<br>") : email.subject;
          preview.style.cursor = 'pointer';
          preview.style.padding = '4px';
          preview.style.borderBottom = '1px solid #ccc';
          
          preview.addEventListener('click', () => {
            emailContent.innerHTML = `
            <h4>${Array.isArray(email.subject) ? email.subject.join("<br>") : email.subject}</h4>
              <p>${email.body}</p>
            `;
          });
  
          emailList.appendChild(preview);
        });
      }
    }
  }
  
  // 3. Close mail window
  function closeMailWindow() {
    const mailWindow = document.getElementById('mailWindow');
    if (mailWindow) {
      mailWindow.style.display = 'none';
    }
  }
  
  // =======================================
  // ADVANCED REVIEW: WRONG CHOICES / GLITCH
  // =======================================
  // If you want a separate glitch logic that triggers on negative score or James Brown:
  
  function advancedReviewProfile(action) {
    let profile = allProfiles[currentRound][currentProfileIndex];
  
    if (profile.name === "James Brown") {
        // 1. Show glitch effect
        document.body.classList.add("glitch-flicker", "glitch-overlay");
      
        // 2. After 1.5s, show the blue overlay (no redirect)
        setTimeout(() => {
          showBlueOverlayGameOver();
        }, 1500);
      
        return;
      }
    // If totalScore < 0 => glitch
    if (totalScore < 0) {
      document.body.classList.add("glitch-flicker", "glitch-overlay");
      setTimeout(() => {
        window.location.href = "shutdownglitch.html";
      }, 1500);
      return;
    }
  
    let scoreChange = (action === "approve") ? profile.approvePoints : profile.denyPoints;
    let decision = (action === "approve") ? "APPROVED" : "DENIED";
  
    const loadingPopup = document.getElementById("loading-popup");
    if (loadingPopup) loadingPopup.style.display = "flex";
  
    setTimeout(() => {
      if (loadingPopup) loadingPopup.style.display = "none";
  
      if (scoreChange < 0) {
        document.getElementById("wrong-choice-modal").style.display = "flex";
      } else {
        totalScore += scoreChange;
        scoreDisplay.textContent = `${totalScore}`;
        decisionLog.push(`${profile.name} was ${decision} (${scoreChange} points).`);
  
        if (action === "approve") approvedCount++;
        else deniedCount++;
  
        currentProfileIndex++;
        if (currentProfileIndex < allProfiles[currentRound].length) {
          loadProfile();
        } else {
          endRoundSummary();
        }
      }
    }, 1000);
  }

  function openMailPopup() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('popupMailWindow').style.display = 'block';
  }
  
  function closeMailPopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popupMailWindow').style.display = 'none';
  }

  sessionStorage.setItem("decisionLog", JSON.stringify(decisionLog));

  // Get any existing log from sessionStorage
let existingLog = JSON.parse(sessionStorage.getItem("decisionLog")) || [];
// Merge the current round's decisionLog
let combinedLog = existingLog.concat(decisionLog);
sessionStorage.setItem("decisionLog", JSON.stringify(combinedLog));