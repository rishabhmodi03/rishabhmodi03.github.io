// Project data
const projectsData = [
    {
        id: 1,
        title: "Financial Dashboard",
        category: "javascript",
        image: "assets/images/project1.jpg",
        description: "Interactive dashboard built with JavaScript for financial data visualization and analysis.",
        technologies: ["JavaScript", "D3.js", "REST API"],
        githubLink: "#",
        liveLink: "#",
        detailedDescription: `
            <p>A comprehensive financial dashboard that provides real-time visualizations of financial data. The dashboard includes:</p>
            <ul>
                <li>Interactive charts and graphs for revenue, expenses, and profit analysis</li>
                <li>Financial ratio calculators and visualizers</li>
                <li>Data comparison tools for historical analysis</li>
                <li>Customizable reporting features</li>
            </ul>
            <p>The application uses D3.js for advanced data visualization and connects to financial APIs to fetch real-time data.</p>
        `
    },
    {
        id: 2,
        title: "LLM Fine-tuning Pipeline",
        category: "python llm",
        image: "assets/images/project2.jpg",
        description: "Python-based pipeline for fine-tuning language models on financial text and reports.",
        technologies: ["Python", "PyTorch", "Hugging Face"],
        githubLink: "#",
        liveLink: "#",
        detailedDescription: `
            <p>A complete pipeline for fine-tuning large language models on financial domain data, including:</p>
            <ul>
                <li>Data preprocessing modules for financial reports and documents</li>
                <li>Custom training routines optimized for financial terminology</li>
                <li>Evaluation frameworks for measuring model performance on financial tasks</li>
                <li>Deployment tools for integrating models into production environments</li>
            </ul>
            <p>The pipeline leverages the Hugging Face ecosystem and PyTorch for efficient training and deployment.</p>
        `
    },
    {
        id: 3,
        title: "Audit Automation Tool",
        category: "accounting python",
        image: "assets/images/project3.jpg",
        description: "Python tool for automating repetitive audit tasks and generating compliance reports.",
        technologies: ["Python", "Pandas", "Excel API"],
        githubLink: "#",
        liveLink: "#",
        detailedDescription: `
            <p>An automation tool designed to streamline the audit process by:</p>
            <ul>
                <li>Automating data extraction from various financial systems</li>
                <li>Performing reconciliations and identifying discrepancies</li>
                <li>Generating audit trails and documentation</li>
                <li>Creating standardized audit reports that comply with regulatory requirements</li>
            </ul>
            <p>The tool significantly reduces manual effort in audit procedures and improves accuracy by eliminating human error.</p>
        `
    },
    {
        id: 4,
        title: "Tax Calculator App",
        category: "javascript",
        image: "assets/images/project4.jpg",
        description: "Interactive tax calculator with visualization of tax implications for different scenarios.",
        technologies: ["JavaScript", "Chart.js", "Bootstrap"],
        githubLink: "#",
        liveLink: "#",
        detailedDescription: `
            <p>A comprehensive tax calculator application that helps users:</p>
            <ul>
                <li>Calculate income tax liability under different scenarios</li>
                <li>Visualize tax brackets and marginal rates</li>
                <li>Compare tax implications of different financial decisions</li>
                <li>Generate downloadable tax reports for planning purposes</li>
            </ul>
            <p>The application features an intuitive user interface and real-time calculations to help users make informed financial decisions.</p>
        `
    },
    {
        id: 5,
        title: "Financial Document Analyzer",
        category: "llm python",
        image: "assets/images/project5.jpg",
        description: "LLM-powered tool that extracts and analyzes information from financial documents.",
        technologies: ["Python", "Transformers", "NLP"],
        githubLink: "#",
        liveLink: "#",
        detailedDescription: `
            <p>An advanced document analysis tool powered by language models that:</p>
            <ul>
                <li>Extracts key financial metrics from annual reports and financial statements</li>
                <li>Identifies risk factors and material information in disclosures</li>
                <li>Summarizes complex financial documents into actionable insights</li>
                <li>Tracks changes in financial reporting over time</li>
            </ul>
            <p>The tool uses state-of-the-art NLP techniques to understand the context and implications of financial information.</p>
        `
    },
    {
        id: 6,
        title: "GST Compliance Tool",
        category: "accounting javascript",
        image: "assets/images/project6.jpg",
        description: "Web application for tracking and ensuring GST compliance for businesses.",
        technologies: ["JavaScript", "Node.js", "MongoDB"],
        githubLink: "#",
        liveLink: "#",
        detailedDescription: `
            <p>A comprehensive GST compliance tool that helps businesses:</p>
            <ul>
                <li>Track input and output GST</li>
                <li>Reconcile GST transactions with financial records</li>
                <li>Generate GST returns and compliance reports</li>
                <li>Monitor GST filing deadlines and compliance status</li>
            </ul>
            <p>The application simplifies GST compliance for businesses of all sizes and helps prevent penalties due to non-compliance.</p>
        `
    }
];

// Project modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.modal-content');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when project is clicked
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="modal-header">
                        <h2>${project.title}</h2>
                    </div>
                    <div class="modal-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="modal-description">
                        ${project.detailedDescription}
                    </div>
                    <div class="modal-tech">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-links">
                        <a href="${project.githubLink}" target="_blank" class="btn btn-primary">
                            <i class="fab fa-github"></i> View Code
                        </a>
                        <a href="${project.liveLink}" target="_blank" class="btn btn-secondary">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Animate modal content
                setTimeout(() => {
                    modalContent.style.transform = 'translateY(0)';
                    modalContent.style.opacity = '1';
                }, 50);
            }
        });
    });
    
    // Close modal when close button is clicked
    closeModal.addEventListener('click', () => {
        modalContent.style.transform = 'translateY(50px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    });
    
    // Close modal when clicking outside of modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modalContent.style.transform = 'translateY(50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }, 300);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modalContent.style.transform = 'translateY(50px)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }, 300);
        }
    });
    
    // Set project IDs to cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.setAttribute('data-id', projectsData[index].id);
    });
});