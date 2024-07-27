import "../../styles/pages/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return false;
  };

  const handleTabClick = (route) => {
    if (route === "/Profile") {
      if (!isLoggedIn()) {
        route = "/LoginSignup";
      }
    }
    navigate(route);
  };

  return (
    <div className="homepage-body">
      <div className="home-header-maincontainer">
        <div className="home-header-column">
          <div className="home-header-content">
            <h1 className="heading-1">Welcome to Learning Realm</h1>
            <p className="description body-large">
              Unlock the power of knowledge with our comprehensive learning
              platform. Explore a world of endless possibilities and enhance
              your skills with Learning Realm.
            </p>
          </div>
          <div className="home-header-actions">
            <button className="button-filled button body-small">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="features-container">
        <div className="features-tabs-menu">
          <div
            className="features-tab"
            onClick={() => handleTabClick("/Profile")}
          >
            <h2>Profile</h2>
            <span>
              Explore a vast collection of educational materials, including
              articles, videos, and more.
            </span>
          </div>
          <div
            className="features-tab"
            onClick={() => handleTabClick("/Ai_Services")}
          >
            <h2>AI Services</h2>
            <span>
              Personalized learning recommendations based on your interests and
              progress.
            </span>
          </div>
          <div
            className="features-tab"
            onClick={() => handleTabClick("/LearningHub")}
          >
            <h2>Learning Hub</h2>
            <span>
              Access to a wide range of online courses and tutorials to enhance
              your skills.
            </span>
          </div>
        </div>
      </div>
      <div className="thq-section-padding">
        <div className="thq-section-max-width">
          <div className="cta-accent2-bg">
            <div className="cta-accent1-bg">
              <div className="cta-container1">
                <div className="cta-content">
                  <span className="thq-heading-2">
                    <span>Unlock Your Potential with Learning Realm</span>
                  </span>
                  <p className="thq-body-large">
                    <span>
                      Explore our wide range of learning resources and AI
                      services to enhance your skills and knowledge.
                    </span>
                  </p>
                </div>
                <div className="cta-actions">
                  <button
                    type="button"
                    className="thq-button-filled cta-button"
                  >
                    <span>Get Started</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="showcase-container">
        <div className="showcase-max-width">
          <div className="showcase-container1 showcase-grid">
            <div className="showcase-section-header">
              <h1>Discover the power of our AI Features</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Incidunt eveniet nulla earum, dolorum quos accusantium molestias
                corrupti possimus rerum alias, facilis aspernatur! Voluptatibus
                recusandae dolores officiis sequi blanditiis, nobis praesentium?
              </p>
              <div className="showcase-actions">
                <button className="thq-button-filled">Main Action</button>
              </div>
            </div>
          </div>
          <div className="showcase-container2">
            <div className="showcase-container3 showcase-card">
              <h1 className="showcase-containerheading">
                <span>Exam Generator</span>
              </h1>
              <span className="showcase-containerspan">
                Access a wide range of educational materials, courses, and tools
                to enhance your learning experience.
              </span>
              <label className="showcase-sidetext">01</label>
            </div>

            <div className="showcase-container4 showcase-card">
              <h1 className="showcase-containerheading">
                <span>Text Summarization Generator</span>
              </h1>
              <span className="showcase-containerspan">
                Utilize cutting-edge artificial intelligence services to
                personalize your learning journey and receive tailored
                recommendations.
              </span>
              <label className="showcase-sidetext">02</label>
            </div>
            <div className="showcase-container5 showcase-card">
              <h1 className="showcase-containerheading">
                <span>Flash Cards/Toggle Lists Generator</span>
              </h1>
              <span className="showcase-containerspan">
                Connect with like-minded individuals, participate in
                discussions, and collaborate on projects to expand your
                knowledge.
              </span>
              <label className="showcase-sidetext">03</label>
            </div>
            <div className="showcase-container6 showcase-card">
              <h1 className="showcase-containerheading">
                <span>Questions / Quiz Generator</span>
              </h1>
              <span className="showcase-containerspan">
                Create an account or log in to access exclusive content, track
                your progress, and engage with advanced learning resources.
              </span>
              <label className="showcase-sidetext">04</label>
            </div>
            <div className="showcase-container7 showcase-card">
              <h1 className="showcase-containerheading">
                <span>Cheat Detector</span>
              </h1>
              <span className="showcase-containerspan">
                Create an account or log in to access exclusive content, track
                your progress, and engage with advanced learning resources.
              </span>
              <label className="showcase-sidetext">05</label>
            </div>
          </div>
        </div>
      </div>

      <div className="opinions-maincontainer">
        <div className="opinions">
          <div className="opinions-heading">
            <h2>What Our Users Are Saying</h2>
            <span className="text01">
              <span>
                See what our users have to say about their experience with
                Learning Realm.
              </span>
            </span>
          </div>
          <div className="comments-section">
            <div className="comment">
              <div className="user-info">
                <img
                  src="https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxOTY4MTUwOXw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"
                  alt="John Doe"
                  className="user-image"
                />
                <div className="user-details">
                  <span className="user-name">John Doe</span>
                  <span className="user-profession">Software Engineer</span>
                </div>
              </div>
              <p className="comment-text">
                Learning Realm has been an invaluable resource for me. The AI
                Services have helped me streamline my work processes and enhance
                productivity.
              </p>
            </div>
            <div className="comment">
              <div className="user-info">
                <img
                  src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxOTY4MTUxMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"
                  alt="Jane Smith"
                  className="user-image"
                />
                <div className="user-details">
                  <span className="user-name">Jane Smith</span>
                  <span className="user-profession">UI Designer</span>
                </div>
              </div>
              <p className="comment-text">
                The Learning Realm is a treasure trove of knowledge. I've
                discovered new learning resources that have significantly
                boosted my skills.
              </p>
            </div>
            <div className="comment">
              <div className="user-info">
                <img
                  src="https://images.unsplash.com/photo-1551875671-d593541a4b84?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxOTY4MTUxMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"
                  alt="User 3"
                  className="user-image"
                />
                <div className="user-details">
                  <span className="user-name">David Johnson</span>
                  <span className="user-profession">Student</span>
                </div>
              </div>
              <p className="comment-text">
                As a student, I rely on Learning Realm for study materials and
                resources. It has made my learning journey much more engaging
                and effective.
              </p>
            </div>
            <div className="comment">
              <div className="user-info">
                <img
                  src="https://images.unsplash.com/photo-1484353371297-d8cfd2895020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxOTY4MTUxMHw&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="User 4"
                  className="user-image"
                />
                <div className="user-details">
                  <span className="user-name">Emily Brown</span>
                  <span className="user-profession">Teacher</span>
                </div>
              </div>
              <p className="comment-text">
                I recommend Learning Realm to all educators around the world.
                The platform offers innovative tools and services that can
                revolutionize teaching methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
