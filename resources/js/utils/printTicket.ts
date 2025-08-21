import { Ticket } from '@/types/ticket';
import { getStatusBadgeClasses, getPriorityBadgeClasses } from '@/utils/ticketBadges';

export const printTicket = (ticket: Ticket) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const statusBadgeColor = getStatusBadgeClasses(ticket.status);
    const priorityBadgeColor = getPriorityBadgeClasses(ticket.priority);

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ticket ${ticket.ticket_no}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #3b82f6;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .ticket-title {
                    color: #3b82f6;
                    font-size: 24px;
                    margin: 0;
                }
                .ticket-number {
                    font-size: 18px;
                    margin: 10px 0;
                }
                .badge {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: bold;
                    margin: 0 5px;
                }
                .status-badge { ${statusBadgeColor.replace('bg-', 'background-color: ').replace('text-', 'color: ')} }
                .priority-badge { ${priorityBadgeColor.replace('bg-', 'background-color: ').replace('text-', 'color: ')} }
                .section {
                    margin: 20px 0;
                    padding: 15px;
                    border-left: 4px solid #3b82f6;
                    background-color: #f8fafc;
                }
                .section-title {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 10px;
                    color: #1e40af;
                }
                .field {
                    margin: 8px 0;
                }
                .field-label {
                    font-weight: bold;
                    display: inline-block;
                    width: 120px;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                    border-top: 1px solid #e5e7eb;
                    padding-top: 20px;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 class="ticket-title">IT Helpdesk Support Ticket</h1>
                <div class="ticket-number">Ticket #: ${ticket.ticket_no}</div>
                <div>
                    <span class="badge status-badge">${ticket.status.toUpperCase()}</span>
                    <span class="badge priority-badge">${ticket.priority.toUpperCase()}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Ticket Information</div>
                <div class="field">
                    <span class="field-label">Subject:</span>
                    ${ticket.subject}
                </div>
                <div class="field">
                    <span class="field-label">Category:</span>
                    ${ticket.category?.name || 'N/A'}
                </div>
                <div class="field">
                    <span class="field-label">Description:</span>
                    <div style="margin-top: 5px; white-space: pre-wrap;">${ticket.description}</div>
                </div>
                <div class="field">
                    <span class="field-label">Approval Required:</span>
                    ${ticket.requires_approval ? 'Yes' : 'No'}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Submitted By</div>
                <div class="field">
                    <span class="field-label">Name:</span>
                    ${ticket.submitter?.name || 'N/A'}
                </div>
                <div class="field">
                    <span class="field-label">Email:</span>
                    ${ticket.submitter?.email || 'N/A'}
                </div>
                ${ticket.submitter?.mobile_no ? `
                <div class="field">
                    <span class="field-label">Mobile:</span>
                    ${ticket.submitter.mobile_no}
                </div>
                ` : ''}
                <div class="field">
                    <span class="field-label">Position:</span>
                    ${ticket.submitter?.position || 'N/A'}
                </div>
                <div class="field">
                    <span class="field-label">Department:</span>
                    ${ticket.submitter?.department?.name || 'N/A'}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Assignment</div>
                ${ticket.assignee ? `
                <div class="field">
                    <span class="field-label">Assigned To:</span>
                    ${ticket.assignee.name}
                </div>
                <div class="field">
                    <span class="field-label">Email:</span>
                    ${ticket.assignee.email}
                </div>
                ` : `
                <div class="field">Not assigned yet</div>
                `}
            </div>

            ${ticket.approver ? `
            <div class="section">
                <div class="section-title">Approval Information</div>
                <div class="field">
                    <span class="field-label">Approved By:</span>
                    ${ticket.approver.name}
                </div>
                <div class="field">
                    <span class="field-label">Role:</span>
                    ${ticket.approver.role}
                </div>
                ${ticket.approved_at ? `
                <div class="field">
                    <span class="field-label">Approved At:</span>
                    ${new Date(ticket.approved_at).toLocaleString()}
                </div>
                ` : ''}
            </div>
            ` : ''}

            <div class="section">
                <div class="section-title">Timeline</div>
                <div class="field">
                    <span class="field-label">Created:</span>
                    ${new Date(ticket.created_at).toLocaleString()}
                </div>
                <div class="field">
                    <span class="field-label">Last Updated:</span>
                    ${new Date(ticket.updated_at).toLocaleString()}
                </div>
            </div>

            <div class="footer">
                <p>Generated by IT Helpdesk System</p>
                <p>Export Date: ${new Date().toLocaleString()}</p>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() {
                        window.close();
                    };
                };
            </script>
        </body>
        </html>
    `);

    printWindow.document.close();
};