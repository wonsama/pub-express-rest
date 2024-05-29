-- CreateTable
CREATE TABLE "cmn_user" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "mail" VARCHAR(64) NOT NULL,
    "nckn" VARCHAR(64),
    "cel_phn" VARCHAR(16),
    "pswr" VARCHAR(64) NOT NULL,
    "use_yn" CHAR(1) NOT NULL DEFAULT 'Y',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cmn_user_mail_key" ON "cmn_user"("mail");
