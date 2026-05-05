// src/hooks/useAdmission.js
// Custom hook for all Firebase operations (Firestore + Storage)

import { useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { generateApplicationId } from '../utils/helpers';
import toast from 'react-hot-toast';

export function useAdmission() {
  const [loading, setLoading] = useState(false);

  /**
   * Upload a single file to Firebase Storage
   * Returns the download URL
   */
  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  /**
   * Upload all documents and save application to Firestore
   */
  const submitAdmission = async (formData, paymentId) => {
    setLoading(true);
    try {
      const appId = generateApplicationId();

      // Upload documents to Firebase Storage
      const uploadedUrls = {};

      if (formData.studentPhoto) {
        uploadedUrls.studentPhoto = await uploadFile(
          formData.studentPhoto,
          `admissions/${appId}/student_photo_${formData.studentPhoto.name}`
        );
      }
      if (formData.birthCertificate) {
        uploadedUrls.birthCertificate = await uploadFile(
          formData.birthCertificate,
          `admissions/${appId}/birth_certificate_${formData.birthCertificate.name}`
        );
      }
      if (formData.marksheet) {
        uploadedUrls.marksheet = await uploadFile(
          formData.marksheet,
          `admissions/${appId}/marksheet_${formData.marksheet.name}`
        );
      }

      // Save application data to Firestore
      const applicationData = {
        applicationId: appId,
        // Step 1 - Student details
        studentName: formData.studentName,
        dob: formData.dob,
        gender: formData.gender,
        class: formData.class,
        // Step 2 - Parent details
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        mobile: formData.mobile,
        address: formData.address,
        // Step 3 - Document URLs
        documentURLs: uploadedUrls,
        // Payment details
        paymentId: paymentId || null,
        paymentStatus: paymentId ? 'Paid' : 'Unpaid',
        // Metadata
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'admissions'), applicationData);

      return { success: true, applicationId: appId, applicationData };
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch all applications (admin panel)
   */
  const fetchApplications = async (filterClass = '') => {
    setLoading(true);
    try {
      let q = query(
        collection(db, 'admissions'),
        orderBy('createdAt', 'desc')
      );

      if (filterClass) {
        q = query(
          collection(db, 'admissions'),
          where('class', '==', filterClass),
          orderBy('createdAt', 'desc')
        );
      }

      const snapshot = await getDocs(q);
      const apps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return apps;
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load applications.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitAdmission, fetchApplications };
}
