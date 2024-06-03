-- CreateTable
CREATE TABLE "cmn_user" (
    "id" VARCHAR(64) NOT NULL,
    "mail" VARCHAR(64) NOT NULL,
    "hash" VARCHAR(64) NOT NULL,
    "rfrs_tkn" VARCHAR(64),
    "use_yn" CHAR(1) NOT NULL DEFAULT 'Y',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cmn_user_prfl" (
    "userId" VARCHAR(64) NOT NULL,
    "role_rltn_id" VARCHAR(64),
    "name" VARCHAR(32) NOT NULL,
    "nick_name" VARCHAR(32) NOT NULL,
    "cel_phn" VARCHAR(32) NOT NULL,
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_user_prfl_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "cmn_role_rltn" (
    "id" VARCHAR(64) NOT NULL,
    "grp_id" VARCHAR(64) NOT NULL,
    "rol_id" VARCHAR(64) NOT NULL,
    "xpln" VARCHAR(2048) NOT NULL DEFAULT '',
    "use_yn" CHAR(1) NOT NULL DEFAULT 'Y',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_role_rltn_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "cmn_rol_grp" (
    "id" VARCHAR(64) NOT NULL,
    "kywr" VARCHAR(32) NOT NULL,
    "xpln" VARCHAR(2048) NOT NULL DEFAULT '',
    "use_yn" CHAR(1) NOT NULL DEFAULT 'Y',
    "rgst_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "rgst_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mdfr_id" VARCHAR(64) NOT NULL DEFAULT 'SYSTEM',
    "mdfc_date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cmn_rol_grp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cmn_user_mail_key" ON "cmn_user"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_role_rltn_grp_id_rol_id_key" ON "cmn_role_rltn"("grp_id", "rol_id");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_role_kywr_key" ON "cmn_role"("kywr");

-- CreateIndex
CREATE UNIQUE INDEX "cmn_rol_grp_kywr_key" ON "cmn_rol_grp"("kywr");

-- AddForeignKey
ALTER TABLE "cmn_user_prfl" ADD CONSTRAINT "cmn_user_prfl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "cmn_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmn_role_rltn" ADD CONSTRAINT "cmn_role_rltn_grp_id_fkey" FOREIGN KEY ("grp_id") REFERENCES "cmn_rol_grp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmn_role_rltn" ADD CONSTRAINT "cmn_role_rltn_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "cmn_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmn_role_rltn" ADD CONSTRAINT "cmn_role_rltn_id_fkey" FOREIGN KEY ("id") REFERENCES "cmn_user_prfl"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
