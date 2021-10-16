import '@testing-library/jest-dom';

// jest.mock("firebase/app", () => {
//   const firebase = {
//     firestore: jest.fn().mockReturnValue({
//       collection: jest.fn().mockReturnThis(),
//       orderBy: jest.fn().mockReturnThis(),
//       onSnapshot: jest.fn().mockReturnThis(),
//     }),
//   };
//   firebase.firestore.FieldValue = jest.fn();
//   return {
//     apps: jest.fn().mockReturnValue([]),
//     initializeApp: jest.fn(),
//     storage: jest.fn(),
//     auth: jest.fn(),
//     ...firebase,
//   };
// });
