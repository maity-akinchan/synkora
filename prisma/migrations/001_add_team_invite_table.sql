-- Migration: Add TeamInvite table
-- This migration adds support for team invitations

-- Create TeamInvite table
CREATE TABLE [dbo].[TeamInvite] (
    [id] INT IDENTITY(1,1) NOT NULL,
    [teamId] INT NOT NULL,
    [email] NVARCHAR(150) NOT NULL,
    [roleId] INT NOT NULL,
    [inviterId] INT NOT NULL,
    [tokenHash] NVARCHAR(64) NOT NULL,
    [status] NVARCHAR(20) NOT NULL DEFAULT 'PENDING',
    [expiresAt] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL DEFAULT sysutcdatetime(),
    [acceptedById] INT NULL,
    CONSTRAINT [PK_TeamInvite] PRIMARY KEY ([id]),
    CONSTRAINT [UQ_TeamInvite_tokenHash] UNIQUE ([tokenHash]),
    CONSTRAINT [FK_TeamInvite_Team] FOREIGN KEY ([teamId]) REFERENCES [dbo].[Team]([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_TeamInvite_TeamRole] FOREIGN KEY ([roleId]) REFERENCES [dbo].[TeamRole]([id]),
    CONSTRAINT [FK_TeamInvite_Inviter] FOREIGN KEY ([inviterId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT [FK_TeamInvite_AcceptedBy] FOREIGN KEY ([acceptedById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Create indexes for better query performance
CREATE INDEX [idx_TeamInvite_email] ON [dbo].[TeamInvite]([email]);
CREATE INDEX [idx_TeamInvite_teamId] ON [dbo].[TeamInvite]([teamId]);
CREATE INDEX [idx_TeamInvite_tokenHash] ON [dbo].[TeamInvite]([tokenHash]);

GO
