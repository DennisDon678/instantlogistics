'use client'

import { useState, useEffect } from 'react'
import { Building2, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Save } from 'lucide-react'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const [siteDetails, setSiteDetails] = useState({
        companyName: '',
        tagline: '',
        email: '',
        phone: '',
        address: '',
        country: '',
    })

    const [socialMedia, setSocialMedia] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
    })

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings')
                const data = await res.json()
                if (data.id) {
                    setSiteDetails({
                        companyName: data.companyName || '',
                        tagline: data.tagline || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        address: data.address || '',
                        country: data.country || '',
                    })
                    setSocialMedia({
                        facebook: data.facebook || '',
                        twitter: data.twitter || '',
                        instagram: data.instagram || '',
                        linkedin: data.linkedin || '',
                    })
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])

    const handleSiteDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSiteDetails({
            ...siteDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialMedia({
            ...socialMedia,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ type: '', text: '' })

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...siteDetails,
                    ...socialMedia,
                }),
            })

            if (!res.ok) throw new Error('Failed to save settings')

            setMessage({ type: 'success', text: 'Settings saved successfully!' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="p-8 text-white">Loading settings...</div>
    }

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-[-0.033em]">
                        Settings
                    </h1>
                    <p className="text-[#90adcb] text-base font-normal leading-normal mt-2">
                        Manage your site details and social media links
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {message.text && (
                        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Site Details Section */}
                    <div className="bg-[#1a2836] p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="w-6 h-6 text-[#258cf4]" />
                            <h2 className="text-xl font-bold text-white">Site Details</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="companyName">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={siteDetails.companyName}
                                    onChange={handleSiteDetailsChange}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="Enter company name"
                                />
                            </div>

                            {/* Tagline */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="tagline">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    id="tagline"
                                    name="tagline"
                                    value={siteDetails.tagline}
                                    onChange={handleSiteDetailsChange}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="Enter tagline"
                                />
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2" htmlFor="email">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={siteDetails.email}
                                        onChange={handleSiteDetailsChange}
                                        className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                        placeholder="contact@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2" htmlFor="phone">
                                        <Phone className="w-4 h-4 inline mr-2" />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={siteDetails.phone}
                                        onChange={handleSiteDetailsChange}
                                        className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="address">
                                    <MapPin className="w-4 h-4 inline mr-2" />
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={siteDetails.address}
                                    onChange={handleSiteDetailsChange}
                                    rows={2}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="Enter full address"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="country">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={siteDetails.country}
                                    onChange={handleSiteDetailsChange}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="Enter country"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="bg-[#1a2836] p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex gap-2">
                                <Facebook className="w-5 h-5 text-[#258cf4]" />
                                <Twitter className="w-5 h-5 text-[#258cf4]" />
                                <Instagram className="w-5 h-5 text-[#258cf4]" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Social Media Links</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Facebook */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="facebook">
                                    <Facebook className="w-4 h-4 inline mr-2" />
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    id="facebook"
                                    name="facebook"
                                    value={socialMedia.facebook}
                                    onChange={handleSocialMediaChange}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="https://facebook.com/yourpage"
                                />
                            </div>

                            {/* Twitter */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="twitter">
                                    <Twitter className="w-4 h-4 inline mr-2" />
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    id="twitter"
                                    name="twitter"
                                    value={socialMedia.twitter}
                                    onChange={handleSocialMediaChange}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="https://twitter.com/yourhandle"
                                />
                            </div>

                            {/* Instagram */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="instagram">
                                    <Instagram className="w-4 h-4 inline mr-2" />
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    id="instagram"
                                    name="instagram"
                                    value={socialMedia.instagram}
                                    onChange={handleSocialMediaChange}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="https://instagram.com/yourprofile"
                                />
                            </div>

                            {/* LinkedIn */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="linkedin">
                                    <Linkedin className="w-4 h-4 inline mr-2" />
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    value={socialMedia.linkedin}
                                    onChange={handleSocialMediaChange}
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    placeholder="https://linkedin.com/company/yourcompany"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-3 bg-[#258cf4] text-white font-bold rounded-lg hover:bg-[#258cf4]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
