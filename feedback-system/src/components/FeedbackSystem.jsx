import { useState } from 'react';
import { 
  Brain, 
  Star, 
  Lightbulb, 
  Users,  // Instead of HandshakeSimple
  ClipboardList,  // Instead of ClipboardCheck
  User, 
  Calendar,
  MessageSquare,
  Check,
  AlertTriangle
} from 'lucide-react';

// Simple Alert Component
const SimpleAlert = ({ children, className = '' }) => (
  <div className={`bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`} role="alert">
    <div className="flex items-center gap-2">
      <AlertTriangle className="w-4 h-4" />
      {children}
    </div>
  </div>
);

const categories = {
  professionalKnowledge: {
    icon: Brain,
    title: 'ידע מקצועי',
    questions: {
      productKnowledge: 'ידע מקצועי במוצר',
      productProficiency: 'בקיאות במוצר',
      methodology: 'הכרות עם מתודלוגיות הפרויקט',
      clientEnvironment: 'הכרות מקצועית עם סביבת הלקוחות',
      opportunityIdentification: 'זיהוי הזדמנויות אצל הלקוח',
      manufacturerCertifications: 'ביצוע הסמכות יצרן',
      companyProficiency: 'ידע בפתרונות שונים בחברה'
    }
  },
  personalExcellence: {
    icon: Star,
    title: 'מצוינות אישית',
    questions: {
      priorities: 'פועל.ת עפ"י סדרי עדיפויות נכונים',
      taskExecution: 'ביצוע משימות בצורה מדויקת ויעילה',
      selfLearning: 'יכולת למידה עצמאית והתפתחות אישית',
      independence: 'מתגבר על בעיות וקשיים בכוחות עצמו',
      stressManagement: 'מתפקד.ת ביעילות במצבי עומס ולחץ',
      responsibility: 'לוקח.ת אחריות מקצועית על המטלות',
      remoteWork: 'אפקטיביות בעבודה מהבית'
    }
  },
  initiative: {
    icon: Lightbulb,
    title: 'יוזמה וחדשנות',
    questions: {
      improvement: 'מעלה רעיונות והצעות לשיפור',
      lessonLearned: 'יודע.ת לעשות הפקת לקחים',
      teamEngagement: 'רתימת הצוות לעבודה',
      flagRaising: 'הרמת דגלים בזמן',
      proactiveApproach: 'גישה פרואקטיבית ויוזמה',
      timeReporting: 'הקפדה על דיווחי שעות נכונים'
    }
  },
  workInterfaces: {
    icon: Users,
    title: 'ממשקי עבודה',
    questions: {
      serviceAssistance: 'מסייע.ת למקבלי שירותיו',
      proceduresAdherence: 'הקפדה על נהלי עבודה',
      directiveFollowing: 'עובד.ת על פי הנחיות',
      matrixWork: 'עבודה מטריציונית',
      feedbackReception: 'יכולת קבלת משוב',
      customerService: 'תודעת שירות ללקוחות',
      clientRepresentation: 'ייצוגיות בעבודה מול לקוחות'
    }
  }
};

const StepIndicator = ({ currentStep, completedSteps }) => {
  const steps = [
    { key: 'employee', label: 'הערכת עובד' },
    { key: 'manager', label: 'הערכת מנהל' },
    { key: 'comparison', label: 'השוואת הערכות' }
  ];

  return (
    <div className="flex justify-center mb-8 gap-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.key);
        const isActive = currentStep === step.key;
        
        return (
          <div 
            key={step.key}
            className={`flex items-center gap-2 
              ${isActive ? 'text-blue-600 font-medium' : ''}
              ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border
              ${isActive ? 'bg-blue-600 border-blue-600 text-white' : ''}
              ${isCompleted ? 'bg-green-600 border-green-600 text-white' : 'border-current'}`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : (index + 1)}
            </div>
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

const Header = ({ formData, onFormChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
      <ClipboardList className="w-6 h-6" />
        מערכת משוב הדדי
      </h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-medium text-gray-600 flex items-center gap-2">
            <User className="w-4 h-4" />
            שם העובד
          </label>
          <input
            type="text"
            value={formData.employeeName}
            onChange={(e) => onFormChange('employeeName', e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-600 flex items-center gap-2">
          <Users className="w-4 h-4" />
            שם המעריך
          </label>
          <input
            type="text"
            value={formData.evaluatorName}
            onChange={(e) => onFormChange('evaluatorName', e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            תאריך תחילת עבודה
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => onFormChange('startDate', e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
      </div>
    </div>
  );
};

const QuestionGroup = ({ 
  category, 
  questionKey, 
  questionText, 
  response, 
  note, 
  onRatingChange, 
  onNoteChange 
}) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className={`bg-white p-4 rounded-lg border ${!response ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <label className="font-medium flex-1 ml-4">{questionText}</label>
        <button 
          onClick={() => setShowNotes(!showNotes)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <MessageSquare className="w-4 h-4" />
          {showNotes ? 'סגור הערה' : 'הוסף הערה'}
        </button>
      </div>
      
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map(value => (
          <button
            key={value}
            onClick={() => onRatingChange(category, questionKey, value)}
            className={`flex-1 py-2 border rounded-md transition-colors
              ${response === value ? 
                'bg-blue-600 text-white border-blue-600' : 
                'border-blue-600 hover:bg-blue-50'}`}
          >
            {value}
          </button>
        ))}
      </div>
      
      {showNotes && (
        <textarea
          value={note || ''}
          onChange={(e) => onNoteChange(category, questionKey, e.target.value)}
          placeholder="הוסף הערות כאן..."
          className="w-full p-2 border rounded-md min-h-[100px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      )}
      
      {!response && (
        <SimpleAlert className="mt-2">
          נא לבחור דירוג
        </SimpleAlert>
      )}
    </div>
  );
};

const CategorySection = ({ 
  categoryKey, 
  category, 
  responses, 
  notes, 
  onRatingChange, 
  onNoteChange 
}) => {
  const Icon = category.icon;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <Icon className="w-6 h-6" />
        {category.title}
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(category.questions).map(([questionKey, questionText]) => (
          <QuestionGroup
            key={questionKey}
            category={categoryKey}
            questionKey={questionKey}
            questionText={questionText}
            response={responses[categoryKey]?.[questionKey]}
            note={notes[categoryKey]?.[questionKey]}
            onRatingChange={onRatingChange}
            onNoteChange={onNoteChange}
          />
        ))}
      </div>
    </div>
  );
};

const ComparisonView = ({ employeeResponses, managerResponses, employeeNotes, managerNotes }) => {
  return (
    <div className="space-y-8">
      {Object.entries(categories).map(([categoryKey, category]) => {
        const Icon = category.icon;
        
        return (
          <div key={categoryKey} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-2">
              <Icon className="w-6 h-6" />
              {category.title}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(category.questions).map(([questionKey, questionText]) => {
                const employeeRating = employeeResponses[categoryKey]?.[questionKey];
                const managerRating = managerResponses[categoryKey]?.[questionKey];
                const mismatch = employeeRating !== managerRating;
                
                return (
                  <div key={questionKey} className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium mb-4">{questionText}</h3>
                    
                    <div className={`p-4 rounded-md mb-4 ${mismatch ? 'bg-red-50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4" />
                        <span>הערכת עובד: {employeeRating || '-'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <users className="w-4 h-4" />
                        <span>הערכת מנהל: {managerRating || '-'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {mismatch ? (
                          <>
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-red-500">אי התאמה</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">התאמה</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {(employeeNotes[categoryKey]?.[questionKey] || managerNotes[categoryKey]?.[questionKey]) && (
                      <div className="space-y-4">
                        {employeeNotes[categoryKey]?.[questionKey] && (
                          <div>
                            <h4 className="font-medium text-gray-600 flex items-center gap-2 mb-2">
                              <MessageSquare className="w-4 h-4" />
                              הערות העובד:
                            </h4>
                            <p className="text-gray-700">{employeeNotes[categoryKey][questionKey]}</p>
                          </div>
                        )}
                        
                        {managerNotes[categoryKey]?.[questionKey] && (
                          <div>
                            <h4 className="font-medium text-gray-600 flex items-center gap-2 mb-2">
                              <MessageSquare className="w-4 h-4" />
                              הערות המנהל:
                            </h4>
                            <p className="text-gray-700">{managerNotes[categoryKey][questionKey]}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FeedbackSystem = () => {
  const [currentStep, setCurrentStep] = useState('employee');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    evaluatorName: '',
    startDate: ''
  });
  const [employeeResponses, setEmployeeResponses] = useState({});
  const [managerResponses, setManagerResponses] = useState({});
  const [employeeNotes, setEmployeeNotes] = useState({});
  const [managerNotes, setManagerNotes] = useState({});
  const [showValidationError, setShowValidationError] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingChange = (category, question, value) => {
    const setResponses = currentStep === 'employee' ? setEmployeeResponses : setManagerResponses;
    
    setResponses(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [question]: value
      }
    }));
  };

  const handleNoteChange = (category, question, value) => {
    const setNotes = currentStep === 'employee' ? setEmployeeNotes : setManagerNotes;
    
    setNotes(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [question]: value
      }
    }));
  };

  const validateStep = () => {
    // Validate form data
    if (!formData.employeeName || !formData.evaluatorName || !formData.startDate) {
      return false;
    }

    // Get current responses
    const responses = currentStep === 'employee' ? employeeResponses : managerResponses;
    
    // Check if all questions are answered
    for (const [categoryKey, category] of Object.entries(categories)) {
      for (const questionKey of Object.keys(category.questions)) {
        if (!responses[categoryKey]?.[questionKey]) {
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateStep()) {
      setShowValidationError(true);
      // Scroll to top where the error message will be shown
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowValidationError(false);
    const newCompletedSteps = [...completedSteps, currentStep];
    setCompletedSteps(newCompletedSteps);

    if (currentStep === 'employee') {
      setCurrentStep('manager');
    } else {
      setCurrentStep('comparison');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4" dir="rtl">
      <StepIndicator 
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      
      <Header 
        formData={formData}
        onFormChange={handleFormChange}
      />

      {showValidationError && (
        <SimpleAlert className="mb-6">
          נא למלא את כל השדות הנדרשים
        </SimpleAlert>
      )}

      {currentStep !== 'comparison' ? (
        <div className="space-y-8">
          {Object.entries(categories).map(([categoryKey, category]) => (
            <CategorySection
              key={categoryKey}
              categoryKey={categoryKey}
              category={category}
              responses={currentStep === 'employee' ? employeeResponses : managerResponses}
              notes={currentStep === 'employee' ? employeeNotes : managerNotes}
              onRatingChange={handleRatingChange}
              onNoteChange={handleNoteChange}
            />
          ))}
          
          <button 
            onClick={handleSubmit}
            className="w-full max-w-xs mx-auto block bg-blue-600 text-white py-3 px-6 rounded-md
              hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2"
          >
            {currentStep === 'employee' ? 
              'שלח והמשך להערכת מנהל' : 
              'שלח וצפה בהשוואה'
            }
          </button>
        </div>
      ) : (
        <ComparisonView
          employeeResponses={employeeResponses}
          managerResponses={managerResponses}
          employeeNotes={employeeNotes}
          managerNotes={managerNotes}
        />
      )}
    </div>
  );
};

export default FeedbackSystem;