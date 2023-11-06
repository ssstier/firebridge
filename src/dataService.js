import { getDatabase, ref, onValue, remove, update, push } from 'firebase/database';
import firebaseApp from './firebaseConfig';

const db = getDatabase(firebaseApp);

export const getSubmissions = (callback) => {
  const submissionsRef = ref(db, 'FormSubmission/');
  onValue(submissionsRef, (snapshot) => {
    const submissions = snapshot.val();
    const submissionsList = submissions ? Object.keys(submissions).map(key => ({
      ...submissions[key],
      id: key
    })) : [];
    callback(submissionsList);
  });
};

export const deleteSubmission = (submissionId, callback) => {
  const submissionRef = ref(db, `FormSubmission/${submissionId}`);
  remove(submissionRef).then(callback);
};

export const saveSubmissionEdit = (submissionId, editedSubmission, callback) => {
  const submissionRef = ref(db, `FormSubmission/${submissionId}`);
  update(submissionRef, editedSubmission).then(callback);
};

export const addNewSubmission = (newSubmission, callback) => {
  const submissionsRef = ref(db, 'FormSubmission/');
  push(submissionsRef, newSubmission).then(callback);
};
