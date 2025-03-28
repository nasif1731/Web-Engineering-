const API_BASE_URL = "http://localhost:3000/api";

async function loadJobs() {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    const jobs = await response.json();

    const jobList = document.getElementById('job-list');
    const adminJobSelect = document.getElementById('adminJobSelect');
    
    jobList.innerHTML = '';
    adminJobSelect.innerHTML = '<option value="">Select a Job</option>';
    
    jobs.forEach(job => {
      jobList.innerHTML += `
        <div class="col-md-4">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <p class="card-text">${job.description}</p>
              <button class="btn btn-primary" onclick="openApplyModal('${job._id}')">Apply Now</button>
            </div>
          </div>
        </div>`;
      
      adminJobSelect.innerHTML += `<option value="${job._id}">${job.title}</option>`;
    });
  } catch (error) {
    console.error(" Error fetching jobs:", error);
  }
}


function openApplyModal(jobId) {
  document.getElementById('jobId').value = jobId;
  new bootstrap.Modal(document.getElementById('applyModal')).show();
}


document.getElementById('apply-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const applicationData = {
    jobId: document.getElementById('jobId').value,
    name: document.getElementById('applicantName').value,
    email: document.getElementById('applicantEmail').value,
    resume: document.getElementById('resumeLink').value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) throw new Error("Failed to submit application");

    alert(" Application submitted successfully!");
    document.getElementById('apply-form').reset();
  } catch (error) {
    console.error(" Error submitting application:", error);
  }
});


document.getElementById('adminJobSelect').addEventListener('change', async function () {
  const jobId = this.value;
  if (!jobId) return;

  try {
    const response = await fetch(`${API_BASE_URL}/applicants/${jobId}`);
    const applicants = await response.json();

    const applicantList = document.getElementById('applicant-list');
    applicantList.innerHTML = '';

    applicants.forEach(applicant => {
      applicantList.innerHTML += `
        <tr>
          <td>${applicant.name}</td>
          <td>${applicant.email}</td>
          <td><a href="${applicant.resume}" target="_blank">View Resume</a></td>
        </tr>`;
    });
  } catch (error) {
    console.error(" Error fetching applicants:", error);
  }
});

// Load jobs on page load
document.addEventListener("DOMContentLoaded", loadJobs);
