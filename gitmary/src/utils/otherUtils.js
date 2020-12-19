function hash(refOrHash) {
    if (objects.exists(refOrHash)) {
        return refOrHash
    } else {
        var terminalRef = refs.terminalRef(refOrHash)
        if (terminalRef === 'FETCH_HEAD') {
            return refs.fetchHeadBranchToMerge(refs.headBranchName())
        } else if (refs.exists(terminalRef)) {
            return files.read(files.gitletPath(terminalRef))
        }
    }
}
