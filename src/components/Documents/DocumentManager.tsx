import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Download, Eye, Trash2, Lock, Unlock, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document } from '../../types';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DocumentManagerProps {
  documents: Document[];
  onUpload: (files: File[]) => void;
  onDelete: (id: string) => void;
  onSign: (id: string, signature: string) => void;
  canEdit?: boolean;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  onUpload,
  onDelete,
  onSign,
  canEdit = true
}) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const [signatureRef, setSignatureRef] = useState<SignatureCanvas | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleSign = () => {
    if (signatureRef && selectedDocument) {
      const signatureData = signatureRef.toDataURL();
      onSign(selectedDocument.id, signatureData);
      setShowSignature(false);
      setSelectedDocument(null);
    }
  };

  const clearSignature = () => {
    if (signatureRef) {
      signatureRef.clear();
    }
  };

  const downloadDocument = (document: Document) => {
    const link = document.createElement('a');
    link.href = document.url;
    link.download = document.name;
    link.click();
  };

  const generatePDF = async () => {
    const pdf = new jsPDF();
    
    // Add document list to PDF
    pdf.setFontSize(20);
    pdf.text('Legal Documents', 20, 30);
    
    let yPosition = 50;
    documents.forEach((doc, index) => {
      pdf.setFontSize(12);
      pdf.text(`${index + 1}. ${doc.name}`, 20, yPosition);
      pdf.text(`Type: ${doc.type}`, 30, yPosition + 10);
      pdf.text(`Uploaded: ${new Date(doc.uploadedAt).toLocaleDateString()}`, 30, yPosition + 20);
      pdf.text(`Status: ${doc.signed ? 'Signed' : 'Pending'}`, 30, yPosition + 30);
      yPosition += 50;
    });
    
    pdf.save('legal-documents.pdf');
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word')) return '📝';
    return '📁';
  };

  const getStatusColor = (document: Document) => {
    if (document.signed) return 'text-green-600 bg-green-100';
    if (document.signatureRequired) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {canEdit && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isDragActive ? 'Drop files here' : 'Upload Documents'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Drag & drop files here, or click to select files
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Supports PDF, DOC, DOCX, PNG, JPG (Max 10MB)
          </p>
        </div>
      )}

      {/* Document List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Documents ({documents.length})
          </h3>
          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((document) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(document.type)}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {document.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(document.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {document.isConfidential && (
                    <Lock className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document)}`}>
                  {document.signed ? 'Signed' : document.signatureRequired ? 'Signature Required' : 'Uploaded'}
                </span>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(document.uploadedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedDocument(document)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm flex items-center justify-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                
                <button
                  onClick={() => downloadDocument(document)}
                  className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>

                {document.signatureRequired && !document.signed && (
                  <button
                    onClick={() => {
                      setSelectedDocument(document);
                      setShowSignature(true);
                    }}
                    className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <PenTool className="h-4 w-4" />
                  </button>
                )}

                {canEdit && (
                  <button
                    onClick={() => onDelete(document.id)}
                    className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {selectedDocument && !showSignature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedDocument.name}
                </h3>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-4 max-h-[70vh] overflow-auto">
                {selectedDocument.type.includes('image') ? (
                  <img
                    src={selectedDocument.url}
                    alt={selectedDocument.name}
                    className="max-w-full h-auto mx-auto"
                  />
                ) : selectedDocument.type.includes('pdf') ? (
                  <iframe
                    src={selectedDocument.url}
                    className="w-full h-96"
                    title={selectedDocument.name}
                  />
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Preview not available for this file type
                    </p>
                    <button
                      onClick={() => downloadDocument(selectedDocument)}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download to View
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signature Modal */}
      <AnimatePresence>
        {showSignature && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sign Document: {selectedDocument.name}
                </h3>
                
                <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg mb-4">
                  <SignatureCanvas
                    ref={(ref) => setSignatureRef(ref)}
                    canvasProps={{
                      width: 500,
                      height: 200,
                      className: 'signature-canvas w-full'
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={clearSignature}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Clear
                  </button>
                  
                  <div className="space-x-3">
                    <button
                      onClick={() => setShowSignature(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSign}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Document
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentManager;