-- CreateTable
CREATE TABLE "cmn_user" (
    "id" VARCHAR(64) NOT NULL,
    "mail" VARCHAR(64) NOT NULL,
    "hash" VARCHAR(64) NOT NULL,
    "rfrs_tkn" VARCHAR(256),
    "use_yn" CHAR(1) NOT NULL DEFAULT 'Y',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmn_user_prfl" (
    "id" VARCHAR(64) NOT NULL,
    "userId" VARCHAR(64) NOT NULL,
    "name" VARCHAR(32),
    "nick_name" VARCHAR(64),
    "cel_phn" VARCHAR(32),
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_user_prfl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmn_prms" (
    "id" VARCHAR(64) NOT NULL,
    "kywr" VARCHAR(32) NOT NULL,
    "xpln" VARCHAR(2048) NOT NULL DEFAULT '',
    "use_yn" CHAR(1) NOT NULL DEFAULT 'Y',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_prms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmn_role" (
    "id" VARCHAR(64) NOT NULL,
    "kywr" VARCHAR(32) NOT NULL,
    "xpln" VARCHAR(2048) NOT NULL DEFAULT '',
    "use_yn" CHAR(1) NOT NULL DEFAULT 'Y',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmn_role_prms" (
    "id" VARCHAR(64) NOT NULL,
    "role_id" VARCHAR(64) NOT NULL,
    "prms_id" VARCHAR(64) NOT NULL,
    "xpln" VARCHAR(2048) NOT NULL DEFAULT '',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_role_prms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmn_user_role" (
    "id" VARCHAR(64) NOT NULL,
    "user_id" VARCHAR(64) NOT NULL,
    "role_id" VARCHAR(64) NOT NULL,
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cmn_user_mail_key" ON "cmn_user"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_user_prfl_userId_key" ON "cmn_user_prfl"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_prms_kywr_key" ON "cmn_prms"("kywr");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_role_kywr_key" ON "cmn_role"("kywr");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_role_prms_role_id_prms_id_key" ON "cmn_role_prms"("role_id", "prms_id");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_user_role_user_id_role_id_key" ON "cmn_user_role"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "cmn_user_prfl" ADD CONSTRAINT "cmn_user_prfl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "cmn_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmn_role_prms" ADD CONSTRAINT "cmn_role_prms_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "cmn_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmn_role_prms" ADD CONSTRAINT "cmn_role_prms_prms_id_fkey" FOREIGN KEY ("prms_id") REFERENCES "cmn_prms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmn_user_role" ADD CONSTRAINT "cmn_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "cmn_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmn_user_role" ADD CONSTRAINT "cmn_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "cmn_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
