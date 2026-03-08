import { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/app/components/ui/dialog';
import { Plus, Edit, Trash2, Calendar, Share2, Download, Copy, Check } from 'lucide-react';
import { timetableAPI } from '@/services/api';
import { toast } from 'sonner';

export default function Timetable() {
  const { subjects, timetable, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry, refreshTimetable, refreshSubjects, user } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [shareCode, setShareCode] = useState<string>('');
  const [importCode, setImportCode] = useState<string>('');
  const [previewData, setPreviewData] = useState<any>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    day: '',
    subjectId: '',
    startTime: '',
    endTime: '',
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = subjects.find((s) => (s._id || s.id) === formData.subjectId);
    if (!subject) return;

    const data = {
      day: formData.day,
      subjectId: formData.subjectId,
      subjectName: subject.name,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    try {
      if (editingEntry) {
        await updateTimetableEntry(editingEntry._id || editingEntry.id, data);
      } else {
        await addTimetableEntry(data);
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      // Error is already handled by the context
    }
  };

  const resetForm = () => {
    setFormData({ day: '', subjectId: '', startTime: '', endTime: '' });
    setEditingEntry(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this entry?')) {
      try {
        await deleteTimetableEntry(id);
      } catch (error) {
        // Error is already handled by the context
      }
    }
  };

  const handleGenerateShareCode = async () => {
    try {
      const response = await timetableAPI.generateShareCode();
      if (response.success) {
        setShareCode(response.data.shareCode);
        toast.success('Share code generated successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to generate share code');
    }
  };

  const handleCopyShareCode = () => {
    navigator.clipboard.writeText(shareCode);
    setCopied(true);
    toast.success('Share code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreviewTimetable = async () => {
    if (!importCode.trim()) {
      toast.error('Please enter a share code');
      return;
    }

    setIsLoadingPreview(true);
    try {
      const response = await timetableAPI.previewByShareCode(importCode.trim().toUpperCase());
      if (response.success) {
        setPreviewData(response.data);
        toast.success(`Preview loaded from ${response.data.ownerName}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid share code');
      setPreviewData(null);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleAdoptTimetable = async () => {
    if (!importCode.trim()) {
      toast.error('Please enter a share code');
      return;
    }

    try {
      const response = await timetableAPI.adoptTimetable(importCode.trim().toUpperCase());
      if (response.success) {
        toast.success(response.message || 'Timetable adopted successfully!');
        setIsImportDialogOpen(false);
        setImportCode('');
        setPreviewData(null);
        // Refresh data
        await refreshTimetable();
        await refreshSubjects();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to adopt timetable');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Timetable</h1>
          <p className="text-gray-600 mt-1">Manage your weekly schedule</p>
        </div>
        <div className="flex gap-2">
          {timetable.length > 0 && (
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => { setShareCode(user?.timetableShareCode || ''); }}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Timetable</DialogTitle>
                  <DialogDescription>Generate a code that others can use to copy your timetable</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {shareCode ? (
                    <div className="space-y-3">
                      <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg text-center">
                        <p className="text-sm text-gray-600 mb-2">Your Share Code</p>
                        <p className="text-3xl font-bold text-purple-600 tracking-wider">{shareCode}</p>
                      </div>
                      <Button onClick={handleCopyShareCode} className="w-full" variant="outline">
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? 'Copied!' : 'Copy Share Code'}
                      </Button>
                      <p className="text-xs text-gray-500 text-center">Share this code with your classmates so they can copy your timetable</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Generate a unique share code that others can use to adopt your timetable structure</p>
                      <Button onClick={handleGenerateShareCode} className="w-full">
                        Generate Share Code
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}

          {subjects.length === 0 && timetable.length === 0 && (
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Import Timetable</DialogTitle>
                  <DialogDescription>Enter a share code to copy someone else's timetable</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter share code (e.g., A1B2C3D4)" 
                      value={importCode}
                      onChange={(e) => setImportCode(e.target.value.toUpperCase())}
                      className="uppercase"
                    />
                    <Button onClick={handlePreviewTimetable} disabled={isLoadingPreview}>
                      {isLoadingPreview ? 'Loading...' : 'Preview'}
                    </Button>
                  </div>

                  {previewData && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-900">From: {previewData.ownerName}</p>
                        <p className="text-xs text-gray-600">{previewData.ownerCollege}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Subjects ({previewData.subjects.length})</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {previewData.subjects.map((subject: any, idx: number) => (
                            <div key={idx} className="text-sm p-2 bg-gray-50 rounded border">
                              <p className="font-medium">{subject.name}</p>
                              {subject.code && <p className="text-xs text-gray-500">{subject.code}</p>}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Weekly Schedule ({previewData.timetable.length} classes)</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {previewData.timetable.map((entry: any, idx: number) => (
                            <div key={idx} className="text-sm p-2 bg-gray-50 rounded border flex justify-between">
                              <div>
                                <p className="font-medium">{entry.subject.name}</p>
                                <p className="text-xs text-gray-600">{entry.dayOfWeek}</p>
                              </div>
                              <p className="text-xs text-gray-600">{entry.startTime} - {entry.endTime}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button onClick={handleAdoptTimetable} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                        Adopt This Timetable
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        This will copy all subjects and timetable entries. Your attendance will start at 0%.
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600" onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingEntry ? 'Edit' : 'Add'} Timetable Entry</DialogTitle>
              </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Day</Label>
                <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject</Label>
                <Select value={formData.subjectId} onValueChange={(value) => setFormData({ ...formData, subjectId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject._id || subject.id} value={(subject._id || subject.id)!}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} required />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} required />
                </div>
              </div>
              <Button type="submit" className="w-full">{editingEntry ? 'Update' : 'Add'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      </div>

      {timetable.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map((day) => {
            const dayEntries = timetable.filter((e) => e.day === day);
            return (
              <Card key={day}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  {dayEntries.length > 0 ? (
                    <div className="space-y-2">
                      {dayEntries.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((entry) => (
                        <div key={entry._id || entry.id} className="p-3 rounded-lg bg-gray-50 border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{entry.subjectName}</p>
                              <p className="text-xs text-gray-600">{entry.startTime} - {entry.endTime}</p>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={() => { setEditingEntry(entry); setFormData({ day: entry.day, subjectId: entry.subjectId, startTime: entry.startTime, endTime: entry.endTime }); setIsDialogOpen(true); }}>
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDelete((entry._id || entry.id)!)} className="text-red-600">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No classes</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl text-gray-900 mb-2">No Timetable Entries</h3>
            <p className="text-gray-600 mb-6">Start by adding your first class</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Class
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
